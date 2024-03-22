import React from 'react'
import * as tf from '@tensorflow/tfjs';
import exampleImage from './assets/exampleImage.jpg';
import Replicate from 'replicate';

const Restore = () => {
  //need to finalise numbers
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