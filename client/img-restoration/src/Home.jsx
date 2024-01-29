import React from 'react'

const Home = () => {
  return (
    <div>
        <div className="bg-[#1976D2] w-full h-screen flex justify-center items-center">
          <div className="w-[60%] text-white text-4xl ml-[5%]">Preserving Moments, Perfecting Pixels: Your Image Restoration Experts</div>
          <div className=" w-[40%] bg-[#DFD5D5] h-full  mr-0 flex flex-col justify-center items-center">
            <p className="text-2xl ">Let`s Get Started</p>
            <div className="flex w-[60%] justify-between mt-16">
            <button className="border-[#1976D2] border-2 bg-transparent rounded-xl px-8 py-2">Login</button>
            <button className="border-[#1976D2] border-2 bg-transparent rounded-xl px-8 py-2">Signin</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Home