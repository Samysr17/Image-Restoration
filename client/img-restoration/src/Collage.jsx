import React, { useState,useEffect } from 'react'
import { db } from './Firebase';
import { arrayUnion,doc,updateDoc,onSnapshot} from 'firebase/firestore';
import { useCallback } from 'react';
import {useDropzone} from 'react-dropzone'
import { FaPlusCircle } from "react-icons/fa";
import Select from 'react-select';
import { ReactPhotoCollage } from "react-photo-collage";
import { UserAuth } from './Context/AuthContext'
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

const Collage = () => {
    const {user}=UserAuth();
    const [dec,setdec]=useState(0);
    const [selectedOption, setSelectedOption] = useState("Restoration");
    const options = [
      { value: 'Restoration', label: 'Restoration',color:'black',route:'/Restore' },
      { value: 'Collage', label: 'Collage',color:'black',route:'/Collage'  },
      { value: 'Home', label: 'Home',color:'black',route:'/Info' },
      { value: 'Denoising', label: 'Denoising',color:'black',route:'/Denoising' }
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
      useEffect(()=>{
        onSnapshot(doc(db,'users',`${user?.email}`),(doc)=>{
         setdec(doc.data()?.credits);
        })
       },[user?.email])
       console.log(dec);
      const handleClick = () => {
        setcollage(!collage);
      };
      function discard(){
        window.location.reload();
      }

  return (
    <div className="h-auto w-full colored">
    <div className=" w-full h-auto">
        <div className="flex justify-between h-[80px] p-6 w-full  text-white cursor-pointer">
           <div className="ml-8 name text-2xl">Image Restoration</div>
           <div className="flex space-x-16 mr-8">
           
           <Link to={selectedOption.route}><Select  className=" text-black"  defaultValue={selectedOption}
        onChange={setSelectedOption} options={options}  /></Link>
              <p>{user.email}</p>
              <button className="bg-white rounded-md  w-24 text-black">{dec} Credits</button>
           </div>
        </div>
        </div>
        <div className="flex flex-col justify-center items-center cursor-pointer">
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
          <img className="w-[20%] h-[200px]"  src={file.source} alt="/"/>
          
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
             <button onClick={handleClick}  className=" hover:text-black hover:bg-white hover:ease-in duration-700 px-6 py-2 border-2 border-white bg-transparent text-white rounded-xl">Continue</button>
             <button onClick={discard} className="  hover:text-black hover:bg-white hover:ease-in duration-700 px-6 py-2 border-2 border-white bg-transparent text-white rounded-xl">Discard</button>
           </div>

        </div>
        <div className="w-full h-auto  flex flex-col absolute">
      <div className="flex justify-between px-16 mt-4 py-4">
       <div className="flex flex-col text-white">
        <p className="md:text-2xl text-xl ">Need more information?</p>
        <p className="mt-2">Write your concern to us and our specialist will get back to you.</p>
       </div>
       <button className="md:text-2xl hidden md:flex text-white md:px-6  hover:text-black hover:bg-white hover:ease-in duration-700  md:py-3 border-2 rounded-xl border-white bg-transparent">
        Contact Us
       </button>

       </div>
       <button className="md:hidden w-[50%] items-center ml-[25%] h-[40px] mt-4 mb-4  text-white  border-2 rounded-xl  hover:text-black hover:bg-white hover:ease-in duration-700 border-white bg-transparent">
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

export default Collage