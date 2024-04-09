import React from 'react'
import { UserAuth } from './Context/AuthContext';
import { useState,useEffect } from 'react';
import { onSnapshot,doc,updateDoc } from 'firebase/firestore';
import { db } from './Firebase';
import Select from 'react-select';

const Profile = () => {
  const {user}=UserAuth();
  const options = [
    { value: 'Restoration', label: 'Restoration',color:'black' },
    { value: 'Collage', label: 'Collage',color:'black'  },
    { value: 'Home', label: 'Home',color:'black'  },
    { value: 'Denoising', label: 'Denoising',color:'black'  }
  ]
  const [r_imgs,setr_imgs]=useState([]);
  const [d_imgs,setd_imgs]=useState([]);
  useEffect(()=>{
   onSnapshot(doc(db,'users',`${user?.email}`),(doc)=>{
    setr_imgs(doc.data()?.saved_r_images);
    setd_imgs(doc.data()?.saved_d_images);
   })
  },[user?.email])
  return (
   <>
     <div className="h-auto w-full bg-[#DFD5D5]">
    <div className="bg-[#1976D2] w-full h-auto">
        <div className="flex justify-between h-[80px] p-6 w-full  text-white">
           <div className="ml-8">LOGO</div>
           <div className="flex space-x-16 mr-8">
           
           <Select className=" text-black" options={options}/>
              <p>{user.email}</p>
              <button className="bg-white rounded-md  w-24 text-black">100 Credits</button>
              <p>Account</p>
           </div>
        </div>
        </div>
        <div className="flex flex-col space-y-8">
        <div>
          <p>Restored Images</p>
        <div className='flex'>
        {r_imgs?.map(file=>( 
          <img className="h-[100px]"  src={file.img} alt=""/>
       ))}
        </div>
        </div>
        <div>
          <span>Denoised Images</span>
        <div className='flex'>
        {d_imgs?.map(file=>(
          <img className="h-[100px]"  src={file.img} alt=""/>
          
       ))}
       </div>
        </div>
        </div>
   </div>
   </>
  )
}

export default Profile