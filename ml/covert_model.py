"""
Converts ml/export_tfjs/model.h5 (a Keras 3 model) into public/model/, in a
format the browser's @tensorflow/tfjs (currently 4.22.0) can actually load.

Why this script exists (read before "just re-running tensorflowjs_converter"):

  tensorflowjs_converter's plain `--input_format=keras` path hard-rejects
  anything but Keras 2 (`keras_h5_conversion._check_version` raises unless
  h5file.attrs['keras_version'] starts with '2'). Models trained with Keras
  3.x (bundled in TensorFlow >= 2.16) fail that check outright.

  The Keras-3-aware path (`--input_format=keras_keras`, for a `.keras` file)
  runs, but its output still isn't loadable by tfjs-layers@4.22.0 for a
  MobileNetV2-style model with a nested Functional submodel, because Keras 3
  changed several schema details that the JS-side deserializer doesn't know
  about yet:
    - InputLayer uses "batch_shape" instead of "batch_input_shape"
    - "inbound_nodes" entries are {args, kwargs} objects instead of the old
      [layer_name, node_index, tensor_index, kwargs] tuples
    - "input_layers"/"output_layers" drop their outer list wrapper when a
      Functional model has exactly one input/output
  On top of that, tfjs-layers' own Keras-3 weight-name handling
  (Container.parseWeights) has a bug (`for...in` over an array instead of
  its values), so even a would-be-correct "layers/<name>/vars/<i>" weight
  naming scheme silently fails to resolve.

  This script instead bypasses the version gate on the plain H5 path (which,
  for this model, DOES store weights grouped by real layer names - verified
  against ml/export_tfjs/model.h5 via h5py), then patches the remaining
  schema differences by hand. It was derived by trial and error against a
  real model; if you change the model architecture, re-verify with
  verify_tfjs_model() below before trusting the output.

Setup (Windows, Python 3.13 - this exact combination has no clean
`pip install tensorflow tensorflowjs` path; adjust if your environment
differs):

    python -m venv venv
    venv\\Scripts\\activate
    pip install tensorflow
    pip install tensorflowjs==4.22.0 --no-deps
    pip install tf_keras tensorflow_decision_forests "tensorflow_hub>=0.16.1" \\
        jax jaxlib flax "setuptools<81" "packaging~=23.1" six importlib_resources
    # tensorflow_decision_forests' compiled ops target TF 2.15 specifically and
    # commonly fail to load on a newer TF/Python combo; if `import tensorflowjs`
    # still fails inside tensorflow_decision_forests's native op loading, replace
    # site-packages/tensorflow_decision_forests/__init__.py with an empty file -
    # tensorflowjs only imports it at module load time and never actually uses it
    # for a plain Keras model conversion.

Run:

    python ml/covert_model.py
"""

import json
import os
import shutil

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
H5_MODEL_PATH = os.path.join(REPO_ROOT, "ml", "export_tfjs", "model.h5")
LABELS_PATH = os.path.join(REPO_ROOT, "ml", "export_tfjs", "labels.json")
OUTPUT_DIR = os.path.join(REPO_ROOT, "public", "model")


def convert_h5_to_tfjs(h5_path, output_dir):
    from tensorflowjs.converters import keras_h5_conversion as conversion

    # See module docstring: the hardcoded Keras-2-only gate blocks this model
    # outright, but the group-walking logic below it works fine here.
    conversion._check_version = lambda h5file: None

    model_json, groups = conversion.h5_merged_saved_model_to_tfjs_format(h5_path)
    os.makedirs(output_dir, exist_ok=True)
    conversion.write_artifacts(model_json, groups, output_dir)


def _keras3_arg_to_tuples(arg):
    if isinstance(arg, dict) and arg.get("class_name") == "__keras_tensor__":
        layer_name, node_index, tensor_index = arg["config"]["keras_history"]
        return [[layer_name, node_index, tensor_index, {}]]
    if isinstance(arg, list):
        tuples = []
        for item in arg:
            tuples.extend(_keras3_arg_to_tuples(item))
        return tuples
    return []


def _translate_inbound_nodes(layer):
    nodes = layer.get("inbound_nodes")
    if not isinstance(nodes, list):
        return
    translated = []
    for node in nodes:
        if isinstance(node, list):
            translated.append(node)
            continue
        args = node.get("args", [])
        tuples = []
        for arg in args:
            tuples.extend(_keras3_arg_to_tuples(arg))
        if not tuples:
            translated.append([])
            continue
        kwargs = node.get("kwargs") or {}
        if kwargs:
            tuples[0] = [tuples[0][0], tuples[0][1], tuples[0][2], kwargs]
        translated.append(tuples)
    layer["inbound_nodes"] = translated


def _fix_in_out_layers(config):
    for key in ("input_layers", "output_layers"):
        value = config.get(key)
        if isinstance(value, list) and value and isinstance(value[0], str):
            config[key] = [value]


def _walk_layers(layers):
    for layer in layers:
        config = layer.get("config", {})
        if layer.get("class_name") == "InputLayer" and "batch_shape" in config:
            config["batch_input_shape"] = config.pop("batch_shape")
        _translate_inbound_nodes(layer)
        if isinstance(config.get("layers"), list):
            _fix_in_out_layers(config)
            _walk_layers(config["layers"])


def _translate_weight_name(name):
    # The plain-H5 conversion path has two naming quirks vs. what tfjs-layers
    # actually builds from the topology (found by diffing against
    # tf.models.modelFromJSON(...).weights.map(w => w.originalName)):
    if name.startswith("sequential/"):
        name = name[len("sequential/"):]
    if name.endswith("_depthwise/kernel"):
        name = name[: -len("kernel")] + "depthwise_kernel"
    return name


def patch_keras3_schema(output_dir):
    model_json_path = os.path.join(output_dir, "model.json")
    with open(model_json_path, "r", encoding="utf-8") as f:
        model_json = json.load(f)

    _walk_layers(model_json["modelTopology"]["model_config"]["config"]["layers"])
    for weight in model_json["weightsManifest"][0]["weights"]:
        weight["name"] = _translate_weight_name(weight["name"])

    with open(model_json_path, "w", encoding="utf-8") as f:
        json.dump(model_json, f)


def verify_tfjs_model(output_dir):
    """Sanity-check the output the way the browser will load it, using Node
    + the project's own @tensorflow/tfjs. Requires `npm install` to have been
    run in the repo root. Raises on failure instead of silently succeeding."""
    import subprocess
    import tempfile

    script = r"""
const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs');
async function main() {
  await tf.setBackend('cpu');
  const dir = process.argv[2];
  const modelJson = JSON.parse(fs.readFileSync(path.join(dir, 'model.json'), 'utf-8'));
  const manifest = modelJson.weightsManifest[0];
  const buffers = manifest.paths.map((p) => fs.readFileSync(path.join(dir, p)));
  const weightData = Buffer.concat(buffers).buffer;
  const model = await tf.loadLayersModel({
    load: async () => ({
      modelTopology: modelJson.modelTopology,
      weightSpecs: manifest.weights,
      weightData,
      format: modelJson.format,
    }),
  });
  const out = model.predict(tf.randomUniform([1, 224, 224, 3]));
  const probs = (await out.array())[0];
  const sum = probs.reduce((a, b) => a + b, 0);
  if (Math.abs(sum - 1) > 1e-3) throw new Error('softmax output does not sum to 1: ' + sum);
  console.log('OK - model loads and predicts, output length', probs.length, 'sum', sum.toFixed(4));
}
main().catch((e) => { console.error('FAILED:', e); process.exit(1); });
"""
    with tempfile.NamedTemporaryFile("w", suffix=".cjs", delete=False, dir=REPO_ROOT) as f:
        f.write(script)
        script_path = f.name
    try:
        subprocess.run(["node", script_path, output_dir], check=True, cwd=REPO_ROOT)
    finally:
        os.remove(script_path)


if __name__ == "__main__":
    convert_h5_to_tfjs(H5_MODEL_PATH, OUTPUT_DIR)
    patch_keras3_schema(OUTPUT_DIR)
    shutil.copyfile(LABELS_PATH, os.path.join(OUTPUT_DIR, "labels.json"))
    verify_tfjs_model(OUTPUT_DIR)
    print("Converted model written to", OUTPUT_DIR)
