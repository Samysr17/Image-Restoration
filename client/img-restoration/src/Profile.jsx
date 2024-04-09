import React from 'react'
import { UserAuth } from './Context/AuthContext';
import { useState,useEffect } from 'react';
import { onSnapshot,doc,updateDoc} from 'firebase/firestore';
import { db } from './Firebase';
import Select from 'react-select';
import axios from 'react'
import { ReactPhotoCollage } from "react-photo-collage";
const Profile = () => {
  const {user}=UserAuth();
  const options = [
    { value: 'Restoration', label: 'Restoration',color:'black' },
    { value: 'Collage', label: 'Collage',color:'black'  },
    { value: 'Home', label: 'Home',color:'black'  },
    { value: 'Denoising', label: 'Denoising',color:'black'  }
  ]
  // const [collage,setcollage]=useState(false);
  // const [collage_1,setcollage_1]=useState(false);
  const [dec,setdec]=useState(0);
  const [r_imgs,setr_imgs]=useState([]);
  const [d_imgs,setd_imgs]=useState([]);
  useEffect(()=>{
   onSnapshot(doc(db,'users',`${user?.email}`),(doc)=>{
    setr_imgs(doc.data()?.saved_r_images);
    setd_imgs(doc.data()?.saved_d_images);
    setdec(doc.data()?.credits);
   })
  },[user?.email])
  // const setting = {
  //   width: '400px',
  //   height: ['200px', '170px'],
  //   layout: [2, 2],
  //   photos: r_imgs,
  // };
  // const setting_1 = {
  //   width: '400px',
  //   height: ['200px', '170px'],
  //   layout: [2, 2],
  //   photos: d_imgs,
  // };
  // const handleclick=()=>{
  //   setcollage(!collage);
  // }
  // const handleclick_1=()=>{
  //   setcollage_1(!collage_1);
  // }
  const toDataURL = async (url) => {
    const response = await axios.get(url, { responseType: "blob" });
    const imageDataUrl = URL.createObjectURL(response.data);
    return imageDataUrl;
  };


  const download = async (imgurl) => {
    const a = document.createElement("a");
    a.href = await toDataURL(URL.createObjectURL(imgurl));
    a.download = "myImage.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
   <>
     <div className="h-auto w-full bg-[#DFD5D5]">
    <div className="bg-[#1976D2] w-full h-auto">
        <div className="flex justify-between h-[80px] p-6 w-full  text-white">
           <div className="ml-8">LOGO</div>
           <div className="flex space-x-16 mr-8">
           
           <Select className=" text-black" options={options}/>
              <p>{user.email}</p>
              <button className="bg-white rounded-md  w-24 text-black">{dec} Credits</button>
              <p>Account</p>
           </div>
        </div>
        </div>
        <div className="flex flex-col space-y-8">
        <div>
          <p>Restored Images</p>
        <div className='flex'>
        {r_imgs?.map(file=>( 
          <div className="flex-col">
          <img   className="h-[100px]"  src={file.img} alt=""/>
          {/* <button onClick={download(file.img)} >Download</button> */}
          </div>
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
        {/* <div>
          <button onClick={handleclick}>Get Restored Collage</button>
          {collage?<ReactPhotoCollage  {...setting} />:(<div></div>)}
          <button onClick={handleclick_1}>Get Denoised Collage</button>
          {collage?<ReactPhotoCollage  {...setting_1} />:(<div></div>)}
        </div> */}
   </div>
   </>
  )
}

export default Profile