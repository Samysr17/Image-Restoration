import React from 'react'
import pic_2 from "./assets/pic_2.jpg"
import { Link } from 'react-router-dom'
const Signup = () => {
  return (
    <div className="">
    <div className=" bg-[#1976D2] w-full h-screen flex justify-center ">
      <div className='md:w-[50%] flex  justify-center items-center '>
         <div className="flex flex-col md:h-[60%] md:w-[60%] ">
           <p className="text-white text-3xl ">Let`s Get Started</p>
           <span className="text-white mt-8">E-mail</span>
           <input  className="bg-transparent mt-2 bg-white border-white border-2 rounded-xl px-6 py-2"></input>
           <span className="text-white mt-8">Password</span>
           <input  className="bg-transparent mt-2 bg-white border-white border-2 rounded-xl px-6 py-2"></input>
           <span className="text-white mt-8">Mobile Number</span>
           <input  className="bg-transparent mt-2 bg-white border-white border-2 rounded-xl px-6 py-2"></input>
           <div className='flex justify-between items-center text-sm text-white mt-2'>
              <p>
                <input className='mr-2' type='checkbox' />
                Remember me
              </p>
              <p>Need Help?</p>
            </div>
           <button className="py-3 mt-4 bg-white rounded-xl">Get OTP</button>

            <p className='py-4 flex' >
              <span className='text-white'>
                Already have an account?
              </span>{' '}
              <button className="text-white ml-2 "><Link to="/SignIn">SignIn</Link></button>
            </p>
         </div>
      </div>
      <div className=" hidden  md:w-[50%] rounded-xl  md:h-screen  mr-0 md:flex md:flex-col justify-center items-center">
        <img className="h-screen w-full" src={pic_2} alt="/"/>
      </div>
    </div>
</div>
  )
}

export default Signup