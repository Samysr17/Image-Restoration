import React, { useState } from 'react'
import { useCallback } from 'react';
import {useDropzone} from 'react-dropzone'
import { FaPlusCircle } from "react-icons/fa";
import Select from 'react-select';
import { ReactPhotoCollage } from "react-photo-collage";
import { UserAuth } from './Context/AuthContext'
// import { useNavigate } from "react-router-dom";

const Collage = () => {
    const {user}=UserAuth();
    const options = [
        { value: 'Restoration', label: 'Restoration',color:'black' },
        { value: 'Denoising', label: 'Denoising',color:'black'  },
        { value: 'Home', label: 'Home',color:'black'  },
        { value: 'Account', label: 'Account',color:'black'  }
      ]
      // const navigate = useNavigate();
      const [images,setimages]=useState([]);
      const [collage,setcollage]=useState(false);
      const [top,settop]=useState('');
      const [bottom,setbottom]=useState('');
      const setting = {
        width: '400px',
        height: ['200px', '170px'],
        layout: [top, bottom],
        photos: images,
      };
      const onDrop = useCallback(acceptedFiles => {
        setimages(acceptedFiles.map(file=>
          Object.assign(file,{
            source:URL.createObjectURL(file)
          })
       
        ))
      }, [])
      const {getRootProps, getInputProps,isDragActive} = useDropzone({onDrop});
      const handleClick = () => {
        setcollage(!collage);
      };
      function discard(){
        window.location.reload();
      }

  return (
    <div className="h-auto w-full colored">
    <div className=" w-full h-auto">
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
           <div {...getRootProps()}>
          <input {...getInputProps()} />
       <div className="flex flex-col items-center">
       {
        isDragActive ?
          <p className="text-white">Drop the files here ...</p> :(
            <div className="flex flex-col justify-center">
          <FaPlusCircle size={20} className="mt-[5%] ml-[49%] items-center text-white " /> 
          <p className="text-white">Drag 'n' drop some files here, or click to select files</p>
          {collage?<ReactPhotoCollage  {...setting} />:(<div></div>)}
          </div>
          
          )
      }
        </div>
           </div>
           </div>
        <div className="flex w-[70%] p-4 justify-center space-x-4">
       {images?.map(file=>(
          <img className="w-[20%]"  src={file.source} alt="/"/>
          
       ))}
       </div>
       <div className="flex flex-col" >
        <div className="flex justify-between">
           <span className="text-white mt-4 ">Enter images on top</span>
               <input onChange={(e)=>{settop(e.target.value)}} type='number'  className="bg-transparent mt-2  bg-white border-white border-2 rounded-xl px-2 py-2"></input>
               </div>
               <div className="flex justify-center  space-x-4">
               <span className="text-white mt-4 ">Enter  images on bottom</span>
               <input type='number' onChange={(e)=>{setbottom(e.target.value)}}  className="bg-transparent  mt-2 bg-white border-white border-2 rounded-xl px-2 py-2"></input>
               </div>
           </div>
           <div className="flex justify-center space-x-4 p-8">
             <button onClick={handleClick}  className="px-6 py-2 border-2 border-white bg-transparent text-white rounded-xl">Continue</button>
             <button onClick={discard} className="px-6 py-2 border-2 border-white bg-transparent text-white rounded-xl">Discard</button>
           </div>

        </div>
        </div>
        
  )
}

export default Collage