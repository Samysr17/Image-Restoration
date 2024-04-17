import React from 'react'
import * as tf from '@tensorflow/tfjs';

import Select from 'react-select';
import { UserAuth } from './Context/AuthContext'
import { useState } from 'react';
import {useDropzone} from 'react-dropzone';
import { useCallback } from 'react';
import { Link } from 'react-router-dom'
import ex from './assets/exampleImage.jpg'

const Impaint = () => {
    const {user}=UserAuth();
    const [saved,setsaved]=useState(false);
    const options = [
      { value: 'Restoration', label: 'Restoration',color:'black' },
      { value: 'Collage', label: 'Collage',color:'black'  },
      { value: 'Home', label: 'Home',color:'black'  },
      { value: 'Denoising', label: 'Denoising',color:'black'  }
    ]
    const preprocessImage = (inputImage) => {
      // Create a canvas element to draw the input image
      const canvas = document.createElement('canvas');
      canvas.width = inputImage.width;
      canvas.height = inputImage.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(inputImage, 0, 0);
    
      // Convert the canvas to a TensorFlow.js tensor
      const tensor = tf.browser.fromPixels(canvas).toFloat();
    
      // Normalize pixel values to [0, 1]
      const normalizedInput = tensor.div(255.0);
    
      // Resize the image to match the model's input size
      const resizedInput = tf.image.resizeBilinear(normalizedInput, [128, 128]);
    
      return resizedInput;
    };
    
      const [image,setimage]=useState("");
      const [model,setmodel]=useState(false);
      const [images,setimages]=useState([]);
      const[error,seterror]=useState(false);
      const onDrop = useCallback(acceptedFiles => {
        setimages(acceptedFiles.map(file=>
          Object.assign(file,{
            source:URL.createObjectURL(file)
          })
         
        ));
      }, [])
      const {getRootProps, getInputProps} = useDropzone({onDrop});
      const handleclick_1=async()=>{
        const model_1= await tf.loadLayersModel('model.json');
        console.log(ex.shape);
        // model_1.predict(ex)
      }
      const handleclick=()=>{
          if(images.length>1){
            seterror(error)
            window.alert("Please Discard and select only 1 image");
            return ;
          }
          if(images.length===0){
            window.alert("Please select an Image");
            return ;
          }
        //   images.map(file=>{
        //   )
      }
     
      const handledis=()=>{
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
           <span>If Image more than 5 kb please Compress</span>
           <a href="https://imagecompressor.com/"><button>Compress</button></a>
           <div {...getRootProps()}>
          <input {...getInputProps()} />
                {
        model ?
          <p>Drop the files here ...</p> :(
            <div className="flex flex-col justify-center">
          <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          )
         }
       <div className="flex flex-col items-center ">
        </div>
           </div>
           <div className="flex space-x-4 justify-between">
            <div className="flex-col">
            {model?(<span className="ml-[20%]">Your Image</span>):<div></div>}
            {images?.map(file=>(
          <img className="h-[200px]"  src={file.source} alt="/"/>
       ))}
           </div>
           {model?(<div className="flex-col">
           <span className="ml-[20%]">Denoised Image</span>
           <img className="h-[200px]"  src={image} alt=""></img>
           </div>):<div></div>}
           </div>
           {model?(<div><div className="flex"><span>Done in</span><div>{window.performance.now()/1000}</div><span>s</span></div><button  className="mt-8">save</button></div>):<div></div>}
           </div>

           <div className="flex justify-center space-x-4 p-8">
             {/* <ToastContainer
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
                <ToastContainer /> */}
            <button onClick={handleclick_1}  className="px-6 py-2 border-2 border-[#1976D2] bg-[#1976D2] text-white rounded-xl">Continue</button>
             <button onClick={handledis} className="px-6 py-2 border-2 border-[#1976D2] bg-[#1976D2] text-white rounded-xl">Discard</button>
           </div>
        </div>
        </div>
  )
}

export default Impaint