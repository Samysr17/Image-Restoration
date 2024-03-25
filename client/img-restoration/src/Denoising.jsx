import React from 'react'
import Upscaler from "upscaler";
import model from '@upscalerjs/maxim-denoising';
import exampleImage from './assets/esrgan1.webp';

const Denoising = () => {
    const upscaler = new Upscaler({
        model,
      });
      const denoise=()=>{
        upscaler.upscale(exampleImage, { patchSize: 64, padding: 2, progress: console.log }).then((upscaledImgSrc) => {
            const img = document.createElement("img");
            img.src = upscaledImgSrc;
            // document.getElementById("target").appendChild(img);
            {<div><img src={img}></img></div>}
          });
        
      }
  return (
    <div>
        <img src={exampleImage}></img>
        <button onClick={denoise} className="p-4 border-black ">Denoise</button>
    </div>
  )
}

export default Denoising