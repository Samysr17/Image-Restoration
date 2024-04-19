import React from 'react'
import { UserAuth } from './Context/AuthContext';
import { useState,useEffect } from 'react';
import { onSnapshot,doc,updateDoc} from 'firebase/firestore';
import { db } from './Firebase';
import Select from 'react-select';
import axios from 'react'
import {loadStripe} from '@stripe/stripe-js';
import { ReactPhotoCollage } from "react-photo-collage";
import { TiTick } from "react-icons/ti";
import { ToastContainer, toast } from 'react-toastify';
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
  const [payment,setpayment]=useState(false);
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
  // const toDataURL = async (url) => {
  //   const response = await axios.get(url, { responseType: "blob" });
  //   const imageDataUrl = URL.createObjectURL(response.data);
  //   return imageDataUrl;
  // };
  
  
  const data = [
    {
      id: 1,
      title: "100 credits",
      price: 100,
      quantity:100

    },
    {
      id: 2,
      title: "200 credits",
      price: 200,
      quantity:200

    },
    {
      id: 3,
      title: "500 credits",
      price: 500,
      quantity:500

    },
  ];


  // const download = async (imgurl) => {
  //   const a = document.createElement("a");
  //   a.href = await toDataURL(URL.createObjectURL(imgurl));
  //   a.download = "myImage.png";
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  // };
  const [plan,setplan]=useState(false);
  const ID=doc(db,'users',`${user?.email}`)
   const handleclick=async(item)=>{
    if(user?.email){
      setplan(!plan);
      toast.success('Loading Payment!!!', {
        position: "top-right",
        autoClose: 20000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      const stripe = await loadStripe("pk_test_51OB9TcSB3m3uX235oYnbAGt7I1TflMXxSLco872UxB27EUY0KqPVTnXHR9z8V5OxPbeV0ZQpYz7rWDY7UKsTPriH005xaPamUu");
      const body = {
          products:[{id:item.id,title:item.title,price:item.price,quantity:item.quantity}]
      }
      const headers = {
          "Content-Type":"application/json"
      }
      const response = await fetch("http://localhost:5000/api/create-checkout-session",{
          method:"POST",
          headers:headers,
          body:JSON.stringify(body)
      });

  
      const session= await response.json();
      await updateDoc(ID,{
        credits:dec+item.quantity
    })
  
      const result = stripe.redirectToCheckout({
          sessionId:session.id,
      });
      
       
     
      // console.log(result)
      // console.log(session.id)
      if(result.error){
          console.log(result.error);
      }
          
    }else{
      window.alert("Please Log in to Continue")
    }
   }

  return (
   <>
     <div className="h-auto w-full bg-[#DFD5D5]">
    <div className="bg-[#1976D2] w-full h-auto">
        <div className="flex justify-between h-[80px] p-6 w-full  text-white">
           <div className="ml-8">Image Restration</div>
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
                <div
          className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8  place-items-center w-9/12 mx-auto
        mt-8"
        >
          {data.map((item, idx) => (
            <div
              key={idx}
              className=''
            >
              <div onClick={()=>handleclick(item)}  className="text-4xl text-slate-700 text-center py-4 font-bold cursor-pointer hover:text-red-700 ease-in duration-700">
               {item.title}
              </div>
              <div  className='border-red-700 border-solid border-2 gap-2 rounded-md p-16 text-slate-700 cursor-pointer  hover:text-white hover:bg-red-700 ease-in duration-700'>
              <div className="flex space-x-2 text-xl  py-4">
              <TiTick className='text-red-700 hover:text-white' size={24}/>
                Price:₹{item.price}
              </div>
              </div>
            </div>
          ))}
        </div>
        <ToastContainer
      position="top-right"
      autoClose={20000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
/>
   </div>
   </>
  )
}

export default Profile