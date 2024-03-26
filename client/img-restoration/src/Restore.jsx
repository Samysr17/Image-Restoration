import React from 'react'
// import * as tf from '@tensorflow/tfjs';
import exampleImage from './assets/esrgan1.webp';
import Upscaler from 'upscaler';
import Select from 'react-select';
import { UserAuth } from './Context/AuthContext'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Restore=()=>{
  const {user}=UserAuth();
  const options = [
    { value: 'Restoration', label: 'Restoration',color:'black' },
    { value: 'Collage', label: 'Collage',color:'black'  },
    { value: 'Home', label: 'Home',color:'black'  },
    { value: 'Denoising', label: 'Denoising',color:'black'  }
  ]
  
    const upscaler = new Upscaler();
    const [image,setimage]=useState("");
    const [model,setmodel]=useState(false);
    const func=()=>{
      // toast(Wow so easy!', {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      //   });
      upscaler.upscale(exampleImage).then(upscaledImage => {
        const img = document.createElement("img")
        img.src = upscaledImage
        // document.body.appendChild(img)
        setimage(img.src);
        setmodel(!model);
        console.log(upscaledImage);
        
      });
    }
    function discard(){
      window.location.reload();
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
           {model?(<div className="flex-col">
           <span className="ml-[20%]">Upscaled Image</span>
           <img className="h-[200px]"  src={image} alt=""></img>
           </div>):<div></div>}
           </div>
           </div>
        <div className="flex w-[70%] p-4 justify-center space-x-4">
          
       </div>
           <div className="flex justify-center space-x-4 p-8">
             <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"/>
  <button onClick={func}  className="px-6 py-2 border-2 border-[#1976D2] bg-[#1976D2] text-white rounded-xl">Continue</button>
<ToastContainer />
             <button onClick={discard} className="px-6 py-2 border-2 border-[#1976D2] bg-[#1976D2] text-white rounded-xl">Discard</button>
           </div>

        </div>
        </div>
  )
}

export default Restore