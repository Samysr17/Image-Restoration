import React from 'react'
import pic_3 from './assets/pic_3.jpg'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { UserAuth } from './Context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Info = () => {
  const {user,logout}=UserAuth();
  const  navigate=useNavigate();
  const handleclick=async(e)=>{
    e.preventDefault()
    await logout();
    navigate("/signup");
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive:[]
  };
  const data = [
    {
      name: `Image Restoration`,
      img:'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
    },
    {
      name: `Watermark Remover`,
      img:'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
    },
    {
      name: `Collage Maker`,
      img:'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
    },
    {
      name: `Image Slider`,
      img:'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
    },
    {
      name: `Download Images `,
      img:'https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg',
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
    },
    
  ];
  return (
    <div className="bg-[#1976D2] w-full  h-auto">
    <div className="">
        <div className="flex justify-between h-[80px] p-6 w-full  text-white">
           <div className="ml-8">LOGO</div>
           <div className="hidden md:flex space-x-16 mr-8">
              <p>About</p>
              <p>{user.email}</p>
              <button className="bg-white rounded-md  w-24 text-black">100 Credits</button>
              <p className="cursor-pointer" onClick={handleclick}>Log Out</p>
           </div>
           <div className="md:hidden mr-8">Hamburger</div>
        </div>
        <div className="md:flex w-full ">
            <div className="bg-[#DFD5D5] flex flex-col  md:w-[70%] justify-center items-center">
              <p className="md:text-4xl text-xl font-semibold md:w-[50%] text-black">Image Restoration: A New Lens to the Past</p>
              <button className="bg-black text-white rounded-xl text-xl py-4 md:mt-16 mt-4 w-[30%] mb-4 md:w-[20%]">Try Now !</button>
            </div>
            <div className="">
               <img className="h-full  w-full" src={pic_3} alt="/"/>
            </div>

        </div>
        <div className="text-white text-5xl text-center mt-8">
          Our Services
        </div>
        <div className='w-2/4 m-auto '>
      <div className="p-20">
      <Slider {...settings}>
        {data.map((d) => (
          <div key={d.name} className="bg-white h-[450px] text-black rounded-xl">
            <div className='h-56   flex justify-center items-center rounded-t-xl'>
            <img  src={d.img} alt="" className=""/>
            </div>
            <div className="flex flex-col  h-auto items-center justify-center gap-4 p-4">
              <p className="text-xl font-semibold">{d.name}</p>
              <p className="text-center">{d.review}</p>
              <button className='bg-transparent border-2 border-[#1976D2] text-lg px-6 py-1 rounded-xl'>Try Now!</button>
            </div>
          </div>
        ))}
      </Slider>
      </div>
    </div>
    <div className="w-full h-auto bg-black/90  flex flex-col absolute">
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
       <div className="flex text-2xl text-white">
        LOGO
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

</div>
  )
}

export default Info