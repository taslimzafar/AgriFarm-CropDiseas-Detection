export type InferenceSource = HTMLImageElement | HTMLCanvasElement | ImageData | HTMLVideoElement

// CanvasRenderingContext2D.drawImage() cannot take ImageData directly (unlike
// tf.browser.fromPixels, which accepts all of InferenceSource) - route it through
// an intermediate canvas via putImageData first.
function drawSourceToCanvas(
  source: InferenceSource,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  if (source instanceof ImageData) {
    const offscreen = document.createElement('canvas')
    offscreen.width = source.width
    offscreen.height = source.height
    offscreen.getContext('2d')!.putImageData(source, 0, 0)
    ctx.drawImage(offscreen, 0, 0, width, height)
  } else {
    ctx.drawImage(source, 0, 0, width, height)
  }
}

export interface ModelConfig {
  modelUrl?: string // URL to TFJS LayersModel JSON
  backendApiUrl?: string // optional REST API for inference fallback
}

let layersModel: import('@tensorflow/tfjs').LayersModel | null = null

export async function initModel(config: ModelConfig) {
  const tf = await import('@tensorflow/tfjs')
  // Optionally set WASM or WebGL backend by env in future
  if (config.modelUrl && !layersModel) {
    layersModel = await tf.loadLayersModel(config.modelUrl)
  }
}

export async function predictFromImage(
  source: InferenceSource,
  labels: string[],
  config: ModelConfig
): Promise<{ label: string; confidence: number } | null> {
  const tf = await import('@tensorflow/tfjs')

  // Backend API fallback
  if (!layersModel && config.backendApiUrl) {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const width = 224
      const height = 224
      canvas.width = width
      canvas.height = height
      drawSourceToCanvas(source, ctx, width, height)
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9)
      const res = await fetch(config.backendApiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: dataUrl }),
      })
      if (!res.ok) return null
      const json = await res.json()
      return json?.prediction ?? null
    } catch {
      return null
    }
  }

  if (!layersModel) return null

  const input = tf.tidy(() => {
    const tensor = tf.browser.fromPixels(source)
    const resized = tf.image.resizeBilinear(tensor, [224, 224])
    const normalized = resized.toFloat().div(255)
    return normalized.expandDims(0)
  })

  // Model's final layer already applies softmax, so its output is a probability
  // distribution directly - do not softmax it again.
  const output = layersModel.predict(input) as import('@tensorflow/tfjs').Tensor
  const probs = (await output.array()) as number[][]
  input.dispose()
  output.dispose()

  const p = probs[0]
  if (!p) return null
  let bestIdx = 0
  for (let i = 1; i < p.length; i++) if (p[i] > p[bestIdx]) bestIdx = i
  return { label: labels[bestIdx] ?? `class_${bestIdx}`, confidence: Math.round(p[bestIdx] * 100) }
}
