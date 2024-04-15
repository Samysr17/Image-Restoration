import React, { useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import ex from './assets/ex1.jpg';

// Function to load the TensorFlow.js model
const loadModel = async () => {
  try {
    const model = await tf.loadLayersModel('model.json');
    return model;
  } catch (error) {
    console.error('Error loading model:', error);
    return null;
  }
};

// Function to preprocess the input image
const preprocessImage = (inputImage) => {
  const inputTensor = tf.browser.fromPixels(inputImage).toFloat();
  // Normalize pixel values to [0, 1]
  const normalizedInput = inputTensor.div(255.0);
  // Resize the image to match the model's input size
  const resizedInput = tf.image.resizeBilinear(normalizedInput, [128, 128]);
  return resizedInput;
};

const inpaintImage = async (inputImage, model) => {
  // Preprocess the input image
  const preprocessedImage = preprocessImage(inputImage);
  console.log('Preprocessed input shape:', preprocessedImage.shape);

  // Generate masked image and missing parts
  const [maskedImage, missingParts] = maskCenter(preprocessedImage);

  // Ensure correct shapes and data types
  const maskedImageFloat32 = maskedImage.toFloat();
  const missingPartsFloat32 = missingParts.toFloat();

  // Log the shapes of the masked image and missing parts
  console.log('Masked image shape:', maskedImageFloat32.shape);
  console.log('Missing parts shape:', missingPartsFloat32.shape);

  // Predict the missing parts using the model
  const predictedMissingParts = model.predict([maskedImageFloat32, missingPartsFloat32]);
  console.log('Predicted missing parts shape:', predictedMissingParts.shape);

  // De-normalize the predicted missing parts
  const denormalizedPredictions = predictedMissingParts.mul(255.0).clipByValue(0, 255).toInt();

  // Resize the predicted missing parts to match the original image size
  const resizedPredictions = tf.image.resizeBilinear(denormalizedPredictions, [inputImage.height, inputImage.width]);

  // Combine the predicted missing parts with the original image
  const inpaintedImage = tf.where(maskedImage.equal(0), resizedPredictions, preprocessedImage);

  // Convert the inpainted image tensor to a canvas
  const canvas = await tf.browser.toPixels(inpaintedImage);
  return canvas;
};

// Function to mask the center of the image
const maskCenter = (inputImage) => {
  const [height, width] = inputImage.shape.slice(0, 2);
  const centerY = Math.floor(height / 2);
  const centerX = Math.floor(width / 2);
  const maskHeight = 32;
  const maskWidth = 32;
  const halfHeight = Math.floor(maskHeight / 2);
  const halfWidth = Math.floor(maskWidth / 2);
  const y1 = centerY - halfHeight;
  const y2 = centerY + halfHeight;
  const x1 = centerX - halfWidth;
  const x2 = centerX + halfWidth;

  const maskedImage = inputImage.clone();
  const missingParts = inputImage.slice([y1, x1, 0], [maskHeight, maskWidth, 3]);
  maskedImage.slice([y1, x1, 0], [maskHeight, maskWidth, 3]).fill(0);

  return [maskedImage.expandDims(0), missingParts.expandDims(0)];
};

// React component for image inpainting
function Demo() {
  const inputRef = useRef(null);
  const [inpaintedImage, setInpaintedImage] = useState(null);

  // Function to handle image inpainting
  const handleInpainting = async () => {
    // Load the model
    const model = await loadModel();
    if (!model) return;

    // Perform inpainting on the input image
    const inputImage = inputRef.current;
    const inpaintedCanvas = await inpaintImage(inputImage, model);
    setInpaintedImage(inpaintedCanvas);
  };

  return (
    <div className="App">
      <input type="file" accept="image/*" onChange={(e) => inputRef.current.src = URL.createObjectURL(e.target.files[0])} />
      <button onClick={handleInpainting}>Inpaint Image</button>
      <br />
      <div>
        <h2>Original Image</h2>
        <img src={ex} alt="Original" ref={inputRef} />
      </div>
      <div>
        <h2>Inpainted Image</h2>
        {inpaintedImage && <img src={inpaintedImage.toDataURL()} alt="Inpainted" />}
      </div>
    </div>
  );
}

export default Demo;