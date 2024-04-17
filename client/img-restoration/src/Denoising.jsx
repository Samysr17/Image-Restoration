import React from 'react'
import { useState } from 'react';
import Upscaler from "upscaler";
import model from '@upscalerjs/maxim-denoising';
import Select from 'react-select';
import { UserAuth } from './Context/AuthContext'
import {useDropzone} from 'react-dropzone';
import { useCallback } from 'react';
import { db } from './Firebase';
import { arrayUnion,doc,updateDoc} from 'firebase/firestore';
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { ImgComparisonSlider } from 'img-comparison-slider';

const Denoising = () => {
  const {user}=UserAuth();
  const [saved,setsaved]=useState(false);
  const options = [
    { value: 'Restoration', label: 'Restoration',color:'black' },
    { value: 'collage', label: 'Collage',color:'black'  },
    { value: 'Info', label: 'Info',color:'black'  },
    { value: 'Account', label: 'Account',color:'black'  }
  ]
    const upscaler = new Upscaler({
        model,
      });
      const [image,setimage]=useState("");
      const [model_1,setmodel_1]=useState(false);
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
        images.map(file=>{
          upscaler.upscale(file.source, { patchSize: 64, padding: 2, progress: console.log }).then((upscaledImage)=>{
            const img = document.createElement("img")
            img.src = upscaledImage
            // document.body.appendChild(img)
            setimage(img.src);
            setmodel_1(!model_1);
            console.log(upscaledImage);
          })
        })
    }
    const handledis=()=>{
      window.location.reload();
    }
    const uid=doc(db,'users',`${user?.email}`);
    const save=async()=>{
     if(user?.email){
      setsaved(true);
      await updateDoc(uid,{
        saved_d_images:arrayUnion({
          img:image
        })
      })
     }
    }
  return (
    <div className="h-auto w-full">
    <div className="colored w-full h-auto">
        <div className="flex justify-between h-[80px] p-6 w-full  text-white">
           <div className="ml-8 name text-2xl">Image Restoratiion</div>
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
           <div {...getRootProps()}>
          <input {...getInputProps()} />
                {
        model_1 ?
          <p></p> :(
            <div className="flex flex-col justify-center text-white">
              <FaPlusCircle size={20} className="mt-[5%] ml-[49%] items-center text-white " />
          <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          )
         }
       <div className="flex flex-col items-center ">
        </div>
           </div>
           <div className="flex space-x-4 justify-between">
            <div className="flex-col">
            {model_1?(<span className="ml-[20%] mt-4 text-white">Your Image</span>):<div></div>}
            {images?.map(file=>(
          <img className="h-[200px]"  src={file.source} alt="/"/>
       ))}
           </div>
           {model_1?(<div className="flex-col">
           <span className="ml-[20%] mt-4 text-white">Denoised Image</span>
           <img className="h-[200px]"  src={image} alt=""></img>
           </div>):<div></div>}
           </div>
           {model_1?(<div><div className="flex text-white mt-4"><span>Done in    :</span><div>{window.performance.now()/1000}</div><span>s</span></div><button onClick={save} className="mt-8 ml-[20%] px-6 py-2 border-2 border-white bg-transparent text-white rounded-xl">save</button></div>):<div></div>}
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
            <button onClick={handleclick}  className="px-6 py-2 border-2 border-white bg-transparent text-white rounded-xl">Continue</button>
             <button onClick={handledis} className="px-6 py-2 border-2 border-white bg-transparent text-white rounded-xl">Discard</button>
           </div>
        </div>
        {!model_1?<div className="flex flex-col justify-center items-center text-white">
          {/* <div className="flex flex-col"> */}
           <span >If Image more than 2 kb please Compress</span>
           <a href="https://imagecompressor.com/"><button className="ml-[20%] mt-4 px-6 py-2 border-2 border-white bg-transparent text-white rounded-xl">Compress Here</button></a>
           {/* </div> */}
           </div>:<div></div>}
        {model_1?<div className="mt-8">
            <img-comparison-slider>
            {images?.map(file=>(
          <img slot="first" className="h-[400px]"  src={file.source} alt="/"/>
       ))}
  <img className="h-[400px]" slot="second" src={image} />
        </img-comparison-slider>
            </div>:<div></div>}
        <div className="w-full h-auto  flex flex-col absolute">
      <div className="flex justify-between px-16 mt-4 py-4">
       <div className="flex flex-col text-white">
        <p className="md:text-2xl text-xl ">Need more information?</p>
        <p className="mt-2">Write your concern to us and our specialist will get back to you.</p>
       </div>
       <button className="md:text-2xl hidden md:flex text-white md:px-6  md:py-3 border-2 rounded-xl border-white bg-transparent">
        Contact Us
       </button>

       </div>
       <button className="md:hidden w-[50%] items-center ml-[25%] h-[40px] mt-4 mb-4  text-white  border-2 rounded-xl border-white bg-transparent">
        Contact Us
       </button>
       <div className="hidden md:flex justify-between px-16  py-4">
       <div className="flex name text-2xl text-white">
        Image Restoration
       </div>
       <div className="flex justify-between  space-x-4">
        <FaFacebook size={40} className="text-blue-800"/>
        <FaInstagram size={40} className="text-red-600"/>
        <FaTwitter size={40} className="text-blue-400"/>
        <FaWhatsapp size={40} className="text-green-600"/>
        <FaLinkedin size={40} className="text-blue-800"/>
       </div>
       </div>
       <div className="md:hidden mt-4 flex justify-center  space-x-4 mb-8">
        <FaFacebook size={40} className="text-blue-800"/>
        <FaInstagram size={40} className="text-red-600"/>
        <FaTwitter size={40} className="text-blue-400"/>
        <FaWhatsapp size={40} className="text-green-600"/>
        <FaLinkedin size={40} className="text-blue-800"/>
       </div>
    </div>
        </div>
  )

}

export default Denoising