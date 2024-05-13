import React from 'react'
import pic_4 from "./assets/pic_4.jpg"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { UserAuth } from './Context/AuthContext'
const Signup = () => {
  const {createUser}=UserAuth();
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [error,seterror]=useState('');
  const navigate=useNavigate();
  const handleClick=async(e)=>{
     e.preventDefault();
     try{
      await createUser(email,password);
      navigate("/Signin");
     }catch(error){
      seterror(error.message);
     }
  }
  return (
    <div className="">
    <div className=" colored w-full h-screen flex justify-center ">
      <div className='md:w-[50%] flex  justify-center items-center '>
         <div className="flex flex-col md:h-[60%] md:w-[60%] ">
           <p className="text-white text-3xl ">Let's Get Started</p>
           <span className="text-white mt-8">E-mail</span>
           <input onChange={(e)=>setemail(e.target.value)}  className="bg-transparent mt-2 bg-black border-white border-2 rounded-xl px-6 py-2 text-white"></input>
           <span className="text-white mt-8">Password</span>
           <input   onChange={(e)=>setpassword(e.target.value)}   className="bg-transparent mt-2 bg-black border-white border-2 rounded-xl px-6 py-2 text-white"></input>
           {error ?<p className='text-red-700'>{error}</p>:null}
           <div className='flex justify-between items-center text-sm text-white mt-2'>
              <p>
                <input className='mr-2' type='checkbox' />
                Remember me
              </p>
              <p>Need Help?</p>
            </div> 
            {/* //complete */}
           <button onClick={handleClick} className="py-3 mt-4  hover:text-black hover:bg-white hover:ease-in duration-700 border-white border-2 rounded-xl text-white">Continue</button>
            <p className='py-4 flex' >
              <span className='text-white'>
                Already have an account?
              </span>{' '}
              <button className="text-white ml-2 "><Link to="/SignIn">SignIn</Link></button>
            </p>
         </div>
      </div>
      <div className=" hidden  md:w-[50%] rounded-xl  md:h-screen  mr-0 md:flex md:flex-col justify-center items-center">
        <img className="h-screen w-full" src={pic_4} alt="/"/>
      </div>
    </div>
</div>
  )
}

export default Signup