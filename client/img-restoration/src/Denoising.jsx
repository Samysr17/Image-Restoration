import React from 'react'
import { useState } from 'react';
import Upscaler from "upscaler";
import model from '@upscalerjs/maxim-denoising';
import exampleImage from './assets/esrgan1.webp';
import Select from 'react-select';
import { UserAuth } from './Context/AuthContext'

const Denoising = () => {
  const {user}=UserAuth();
  const options = [
    { value: 'Restoration', label: 'Restoration',color:'black' },
    { value: 'collage', label: 'Collage',color:'black'  },
    { value: 'Info', label: 'Info',color:'black'  },
    { value: 'Watermark Remover', label: 'Watermark Remover',color:'black'  }
  ]
    const upscaler = new Upscaler({
        model,
      });
      const [image,setimage]=useState("");
      const [model_1,setmodel_1]=useState(false);
      function discard(){
        window.location.reload();
      }
      const denoise=()=>{
        upscaler.upscale(exampleImage, { patchSize: 64, padding: 2, progress: console.log }).then((upscaledImgSrc) => {
            const img = document.createElement("img");
            img.src = upscaledImgSrc;
            // document.body.appendChild(img)
            setimage(img.src);
            setmodel_1(!model_1);
            //  {<div><img alt=" " src={img}></img></div>}
            console.log(upscaledImgSrc)
            // document.getElementById("target").appendChild(img);
           
          });
        
      }
  return (
    <div className="h-auto w-full bg-[#DFD5D5]">
    <div className="bg-[#1976D2] w-full h-auto">
        <div className="flex justify-between h-[80px] p-6 w-full  text-white">
           <div className="ml-8">LOGO</div>
           <div className="flex space-x-16 mr-8">
           
           <Select className=" text-black" options={options} />
              <p>{user.email}</p>
              <button className="bg-white rounded-md  w-24 text-black">100 Credits</button>
              <p>Account</p>
           </div>
        </div>
        </div>
        <div className="flex flex-col justify-center items-center">
           <div className="w-[40%] h-[500px] flex flex-col justify-center items-center mt-[5%] border-dashed border-2 border-black">
           {/* <div {...getRootProps()}>
          <input {...getInputProps()} />
       <div className="flex flex-col items-center ">
       {
        isDragActive ?
          <p>Drop the files here ...</p> :(
            <div className="flex flex-col justify-center">
          <FaPlusCircle size={20} className="mt-[5%] ml-[49%] items-center " /> 
          <p>Drag 'n' drop some files here, or click to select files</p>
          {collage?<ReactPhotoCollage  {...setting} />:(<div></div>)}
          </div>
          
          )
      }
        </div>
           </div> */}
           <div className="flex space-x-4 justify-between">
            <div className="flex-col">
            <span className="ml-[30%]">Your Image</span>
           <img className="h-[200px]" src={exampleImage} alt=""></img>
           </div>
           {model_1?(<div className="flex-col">
           <span className="ml-[20%]">Denoised Image</span>
           <img className="h-[200px]"  src={image} alt=""></img>
           </div>):<div></div>}
           </div>
           </div>
        <div className="flex w-[70%] p-4 justify-center space-x-4">
          
       </div>
           <div className="flex justify-center space-x-4 p-8">
             <button onClick={denoise}  className="px-6 py-2 border-2 border-[#1976D2] bg-[#1976D2] text-white rounded-xl">Continue</button>
             <button onClick={discard} className="px-6 py-2 border-2 border-[#1976D2] bg-[#1976D2] text-white rounded-xl">Discard</button>
           </div>

        </div>
        </div>
  )

}

export default Denoising