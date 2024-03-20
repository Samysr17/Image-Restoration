import React from 'react'
import * as tf from '@tensorflow/tfjs';
import exampleImage from './assets/exampleImage.jpg';
import Replicate from 'replicate';

const Restore = () => {
    async function runModel() {
const replicate = new Replicate();

const input = {
    img: "https://replicate.delivery/mgxm/59d9390c-b415-47e0-a907-f81b0d9920f1/187400315-87a90ac9-d231-45d6-b377-38702bd1838f.jpg"
};

const output = await replicate.run("tencentarc/gfpgan:0fbacf7afc6c144e5be9767cff80f25aff23e52b0708f17e20f9879b2f21516c", { input });
console.log(output)
        // const model = await tf.loadGraphModel('/model.json');
    
        // // Get content image
        // let image = new Image(256,256);
        // image.src = exampleImage;
    
        // // Convert image to tensor and add batch dimension
        // let tfTensor = tf.browser.fromPixels(image);    
        // tfTensor = tfTensor.div(255.0);
        // tfTensor = tfTensor.expandDims(0);
        // tfTensor = tfTensor.cast("float32");
        
        // // Run image through model
        // const pred = model.predict(tfTensor);
        
        // // Convert tensor to image
        // let outputTensor = pred.squeeze();
        
        // // Scale to range [0,1] from [-1,1]
        // outputTensor = outputTensor.mul(0.5);
        // outputTensor = outputTensor.add(0.5);
    
        // // Prepare rendering of the result
        // const canvas = document.getElementById('canvas'); 
        // await tf.browser.toPixels(outputTensor, canvas);      
    }
  return (
    <div>
    <div>Restore</div>
    <div><img alt="" src={exampleImage}></img></div>
    <button onClick={runModel()}>Continue</button>
    </div>
  )
}

export default Restore