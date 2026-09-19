"""
Crop Disease Detection Model Training Script
Trains a MobileNetV2 Transfer Learning classifier on the PlantVillage 38-class dataset.
Exports:
  - ml/export_tfjs/labels.json
  - ml/export_tfjs/model.keras
  - ml/export_tfjs/model.h5 (compatible with ml/covert_model.py for TFJS conversion)
"""

import os
import sys
import json
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models, callbacks
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from sklearn.utils.class_weight import compute_class_weight

def train_model(dataset_dir, export_dir, epochs=6, batch_size=32, img_size=(224, 224)):
    print(f"Loading dataset from: {dataset_dir}")
    if not os.path.exists(dataset_dir):
        raise FileNotFoundError(f"Dataset directory not found: {dataset_dir}")
    
    os.makedirs(export_dir, exist_ok=True)
    
    # Data generators with augmentation for training
    train_datagen = ImageDataGenerator(
        rescale=1.0 / 255.0,
        validation_split=0.2,
        rotation_range=20,
        width_shift_range=0.15,
        height_shift_range=0.15,
        zoom_range=0.15,
        horizontal_flip=True,
        fill_mode='nearest'
    )
    
    val_datagen = ImageDataGenerator(
        rescale=1.0 / 255.0,
        validation_split=0.2
    )
    
    print("Preparing training generator...")
    train_gen = train_datagen.flow_from_directory(
        dataset_dir,
        target_size=img_size,
        batch_size=batch_size,
        subset='training',
        class_mode='sparse',
        shuffle=True
    )
    
    print("Preparing validation generator...")
    val_gen = val_datagen.flow_from_directory(
        dataset_dir,
        target_size=img_size,
        batch_size=batch_size,
        subset='validation',
        class_mode='sparse',
        shuffle=False
    )
    
    class_names = list(train_gen.class_indices.keys())
    num_classes = len(class_names)
    print(f"\nTotal classes detected: {num_classes}")
    for idx, name in enumerate(class_names):
        print(f"  [{idx:02d}] {name}")
        
    labels_file = os.path.join(export_dir, "labels.json")
    with open(labels_file, "w", encoding="utf-8") as f:
        json.dump(class_names, f, indent=2)
    print(f"\nSaved class labels to: {labels_file}")
    
    # Compute balanced class weights
    print("\nComputing class weights...")
    class_weights = compute_class_weight(
        class_weight='balanced',
        classes=np.unique(train_gen.classes),
        y=train_gen.classes
    )
    class_weight_dict = dict(enumerate(class_weights))
    
    # Build MobileNetV2 transfer learning model matching covert_model.py schema
    print("\nBuilding MobileNetV2 Sequential architecture...")
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=(img_size[0], img_size[1], 3),
        include_top=False,
        weights='imagenet'
    )
    base_model.trainable = False
    
    model = models.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dropout(0.25),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    model.summary()
    
    cb = [
        callbacks.EarlyStopping(
            monitor='val_accuracy',
            patience=3,
            restore_best_weights=True,
            verbose=1
        ),
        callbacks.ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.5,
            patience=2,
            min_lr=1e-6,
            verbose=1
        )
    ]
    
    print(f"\n--- Starting Phase 1 Training ({epochs} epochs) ---")
    history = model.fit(
        train_gen,
        validation_data=val_gen,
        epochs=epochs,
        class_weight=class_weight_dict,
        callbacks=cb,
        verbose=1
    )
    
    val_loss, val_acc = model.evaluate(val_gen, verbose=1)
    print(f"\nPhase 1 Complete! Final Validation Accuracy: {val_acc * 100:.2f}%, Loss: {val_loss:.4f}")
    
    # Save models
    keras_path = os.path.join(export_dir, "model.keras")
    h5_path = os.path.join(export_dir, "model.h5")
    
    print(f"Saving Keras 3 format model to {keras_path}...")
    model.save(keras_path)
    
    print(f"Saving H5 format model to {h5_path}...")
    model.save(h5_path)
    
    print(f"\nSuccessfully trained and saved model to {export_dir}")
    return val_acc

if __name__ == '__main__':
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dataset_path = os.path.join(repo_root, 'ml', 'dataset', 'color')
    export_path = os.path.join(repo_root, 'ml', 'export_tfjs')
    
    epochs = int(sys.argv[1]) if len(sys.argv) > 1 else 6
    train_model(dataset_path, export_path, epochs=epochs)
