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
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdChevronLeft,MdChevronRight } from "react-icons/md";
import { Link } from 'react-router-dom';
const Profile = () => {
  const {user}=UserAuth();
  const [selectedOption, setSelectedOption] = useState("Restoration");
  const options = [
    { value: 'Restoration', label: 'Restoration',color:'black',route:'/Restore' },
    { value: 'Collage', label: 'Collage',color:'black',route:'/Collage'  },
    { value: 'Home', label: 'Home',color:'black',route:'/Info' },
    { value: 'Denoising', label: 'Denoising',color:'black',route:'/Denoising' }
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
   const moveLeft=()=>{
    var slider=document.getElementById('slider');
    slider.scrollLeft=slider.scrollLeft-500;
  }
  const moveRight=()=>{
    var slider=document.getElementById('slider');
    slider.scrollLeft=slider.scrollLeft+500;
  }

  return (
   <>
     <div className="h-auto w-full colored">
    <div className=" w-full h-auto">
        <div className="flex justify-between h-[80px] p-6 w-full  text-white">
           <div className="ml-8 name text-2xl">Image Restoration</div>
           <div className="flex space-x-16 mr-8">
           
           <Link to={selectedOption.route}><Select  className=" text-black"  defaultValue={selectedOption}
        onChange={setSelectedOption} options={options}  /></Link>
              <p>{user.email}</p>
              <button className="bg-white rounded-md  w-24 text-black">{dec} Credits</button>
              <p>Log Out</p>
           </div>
        </div>
        </div>
        <div className="flex flex-col space-y-8">
          <div className="flex justify-center text-xl text-white mt-8">Purchase Credits</div>
        <div
          className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-8  place-items-center w-9/12 mx-auto
        mt-16"
        >
          {data.map((item, idx) => (
            <div
              key={idx}
              className=''
              onClick={()=>handleclick(item)} 
            >
              <div  className='border-white border-solid border-2 gap-2 rounded-md p-16 text-white cursor-pointer hover:text-black   hover:bg-white ease-in duration-700'>
              <div className="flex space-x-2 text-xl  py-4">
              <TiTick className='text-white hover:text-white' size={24}/>
                ₹{item.title}
              </div>
              <div className="flex space-x-2 text-xl  py-4">
              <TiTick className='text-white hover:text-white' size={24}/>
                Price:₹{item.price}
              </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <p className="text-xl text-white mt-24 ml-4">Restored Images</p>
        <div className='flex justify-center space-x-8 mt-8'>
        <MdChevronLeft  size={32}   className='bg-white slider mt-8  left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10  group-hover:block'/>
        {r_imgs?.map(file=>( 
          <div className="flex-col">
          <img   className="h-[200px]"  src={file.img} alt=""/>
          {/* <button onClick={download(file.img)} >Download</button> */}
          </div>
       ))}
            <MdChevronRight  size={32} className='bg-white slider mt-8 text-black right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10  group-hover:block'/>
        </div>
        </div>
        <div>
          <span className="text-white text-xl mt-8 ml-4">Denoised Images</span>
        <div className='flex justify-center space-x-8 mt-8'>
        <MdChevronLeft  size={32}  className='bg-white mt-8 text-black left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10  group-hover:block'/>
        {d_imgs?.map(file=>(
          <img className="h-[200px]"  src={file.img} alt=""/>
          
       ))}
            <MdChevronRight  size={32} className='bg-white mt-8 text-black right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10  group-hover:block'/>
       </div>
        </div>
        </div>
        {/* <div>
          <button onClick={handleclick}>Get Restored Collage</button>
          {collage?<ReactPhotoCollage  {...setting} />:(<div></div>)}
          <button onClick={handleclick_1}>Get Denoised Collage</button>
          {collage?<ReactPhotoCollage  {...setting_1} />:(<div></div>)}
        </div> */}
              
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
   </>
  )
}

export default Profile