import React from 'react'
// import * as tf from '@tensorflow/tfjs';
import exampleImage from './assets/esrgan2.webp';
import e2 from './assets/example_images_2.jpeg'
import Upscaler from 'upscaler';

// import Replicate from 'replicate';

const Restore=()=>{
  
    const upscaler = new Upscaler();
    const func=()=>{
      upscaler.upscale(exampleImage).then(upscaledImage => {
        const img = document.createElement("img")
        img.src = upscaledImage
        document.body.appendChild(img)
        {    <div><img alt="" src={img}></img></div>}
        console.log(upscaledImage);
      });
    }
  return (
    <div>
    <div onClick={func}>Restore</div>
    <div><img alt="" src={exampleImage}></img></div>

    {/* <button onClick={runModel()}>Continue</button> */}
    </div>
  )
}

export default Restore