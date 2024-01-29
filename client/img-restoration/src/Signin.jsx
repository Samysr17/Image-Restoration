import React from 'react'
import pic_2 from "./assets/pic_2.jpg"
const Signin = () => {
  return (
    <div>
        <div className="bg-[#1976D2] w-full h-screen flex justify-center ">
          <div className='w-[50%] flex  justify-center items-center '>
             <div className="flex flex-col h-[60%] w-[60%] ">
               <p className="text-white text-3xl ">Welcome Back !</p>
               <p className="text-white text-xl mt-4 ">Enter Your Credentials to access your account</p>
               <span className="text-white mt-8">E-mail</span>
               <input  className="bg-transparent mt-2 bg-white border-white border-2 rounded-xl px-6 py-2"></input>
               <span className="text-white mt-8">Password</span>
               <input  className="bg-transparent mt-2 bg-white border-white border-2 rounded-xl px-6 py-2"></input>
               <div className='flex justify-between items-center text-sm text-white mt-2'>
                  <p>
                    <input className='mr-2' type='checkbox' />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
               <button className="py-3 mt-4 bg-white rounded-xl">Log In</button>

                <p className='py-4 flex' >
                  <span className='text-white'>
                    Don't have an account?
                  </span>{' '}
                  <p className="text-white ml-2">SignUp</p>
                </p>
             </div>
          </div>
          <div className=" signin_bg w-[50%] rounded-xl  h-screen  mr-0 flex flex-col justify-center items-center">
            <img className="h-screen w-full" src={pic_2} alt="/"/>
          </div>
        </div>
    </div>
  )
}

export default Signin