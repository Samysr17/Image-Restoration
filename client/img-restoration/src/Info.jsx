import React from 'react'
import pic_3 from './assets/pic_3.jpg'

const Info = () => {
  return (
    <div>
    <div className="bg-[#1976D2] w-full h-screen">
        <div className="flex justify-between h-[80px] p-6 w-full  text-white">
           <div className="ml-8">LOGO</div>
           <div className="flex space-x-16 mr-8">
              <p>About</p>
              <p>UserName</p>
              <button className="bg-white rounded-md  w-24 text-black">100 Credits</button>
              <p>Account</p>
           </div>
        </div>
        <div className="flex w-full ">
            <div className="bg-[#DFD5D5] flex flex-col  w-[70%] justify-center items-center">
              <p className="text-4xl font-semibold w-[50%] text-black">Image Restoration: A New Lens to the Past</p>
              <button className="bg-black text-white rounded-xl text-xl py-4 mt-16 w-[20%]">Try Now !</button>
            </div>
            <div className="">
               <img className="h-full  w-full" src={pic_3} alt="/"/>
            </div>

        </div>
        <div className="text-white text-5xl text-center mt-8">
          Our Services
        </div>
     </div>
</div>
  )
}

export default Info