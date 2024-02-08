import React, { useState } from 'react'
import { useCallback } from 'react';
import {useDropzone} from 'react-dropzone'
import { FaPlusCircle } from "react-icons/fa";
import Select from 'react-select';
import { ReactPhotoCollage } from "react-photo-collage";

const Collage = () => {
    const options = [
        { value: 'Restoration', label: 'Restoration',color:'black' },
        { value: 'strawberry', label: 'Collage',color:'black'  },
        { value: 'vanilla', label: 'Slider',color:'black'  },
        { value: 'Watermark Remover', label: 'Watermark Remover',color:'black'  }
      ]
     
      const [images,setimages]=useState([]);
      const onDrop = useCallback(acceptedFiles => {
        setimages(acceptedFiles.map(file=>
          Object.assign(file,{
            preview:URL.createObjectURL(file)
          })
       
        ))
        console.log(images);
        console.log(images[0]);
      }, [])
      const {getRootProps, getInputProps} = useDropzone({onDrop});
      const setting = {
        width: '600px',
        height: ['250px', '170px'],
        layout: [1, 1],
        photos:images,
        showNumOfRemainingPhotos: true
      };
  return (
    <div className="h-auto w-full bg-[#DFD5D5]">
    <div className="bg-[#1976D2] w-full h-auto">
        <div className="flex justify-between h-[80px] p-6 w-full  text-white">
           <div className="ml-8">LOGO</div>
           <div className="flex space-x-16 mr-8">
           <Select options={options} />
              <p>About</p>
              <p>UserName</p>
              <button className="bg-white rounded-md  w-24 text-black">100 Credits</button>
              <p>Account</p>
           </div>
        </div>
        </div>
        <div className="flex flex-col justify-center items-center">
           <div className="w-[40%] h-[500px] flex flex-col justify-center items-center mt-[5%] border-dashed border-2 border-black">
           <div {...getRootProps()}>
          <input {...getInputProps()} />
          {images?.map(file=>{
          <img className="w-50% " src={file.preview} alt="/"/>
       })}
       <div className="flex flex-col items-center ">
        <FaPlusCircle size={20} className="mt-[5%]" /> 
        <p>Drop</p>
        </div>
        <div className="grid grid-rows-2 gap-0 grid-flow-col">
       {images?.map(file=>(
          <img className="w-[50%]"  src={file.preview} alt="/"/>
          
       ))}
       </div>
       <ReactPhotoCollage  {...setting} />
        </div>
       
            
           </div>
           <div className="flex justify-center space-x-4 p-8">
             <button className="px-6 py-2 border-2 border-[#1976D2] bg-[#1976D2] text-white rounded-xl">Continue</button>
             <button className="px-6 py-2 border-2 border-[#1976D2] bg-[#1976D2] text-white rounded-xl">Discard</button>
           </div>
        </div>
        </div>
  )
}

export default Collage