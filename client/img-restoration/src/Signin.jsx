import React from 'react'
import { Link } from 'react-router-dom'
import pic_5 from "./assets/pic_5.jpg"
import { useState } from 'react'
import { UserAuth } from './Context/AuthContext'
import { useNavigate } from 'react-router-dom'
const Signin = () => {
  const {user,login}=UserAuth();
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [error,seterror]=useState('');
  const navigate=useNavigate();
  // console.log(user);
  // console.log(user.emailVerified)
  const handleclick=async(e)=>{
    e.preventDefault();
    try{
      await login(email,password);
      if(user?.emailVerified===true){
        navigate("/info");
      }else{
        window.alert("Please Verify Email to Continue or Reload")
      }
      
    }catch(error){
      seterror(error);
      console.log(error);
    }
  }
  return (
    <div>
        <div className="colored w-full h-screen flex justify-center ">
          <div className='w-[50%] flex  justify-center items-center '>
             <div className="flex flex-col md:h-[60%] md:w-[60%] ">
               <p className="text-white text-3xl ">Welcome Back !</p>
               <p className="text-white text-xl mt-4 ">Enter Your Credentials to access your account</p>
               <span  className="text-white mt-8">E-mail</span>
               <input onChange={(e)=>setemail(e.target.value)}  className="bg-transparent mt-2 text-white bg-black border-white border-2 rounded-xl px-6 py-2"></input>
               <span  className="text-white mt-8">Password</span>
               <input type="password" onChange={(e)=>setpassword(e.target.value)}  className="bg-transparent text-white mt-2 bg-black border-white border-2 rounded-xl px-6 py-2"></input>
               {error ?<p className='text-red-700'>{error}</p>:null}
               <div className='flex justify-between items-center text-sm text-white mt-2'>
                  <p>
                    <input className='mr-2' type='checkbox' />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
               <button onClick={handleclick} className="py-3  hover:text-black hover:bg-white hover:ease-in duration-700 mt-4  border-2 text-white border-white rounded-xl">Log In</button>

                <p className='py-4 flex' >
                  <span className='text-white'>
                    Don't have an account?
                  </span>{' '}
                  <button  className="text-white ml-2 "><Link to="/">SignUp</Link></button>
                </p>
             </div>
          </div>
          <div className="hidden w-[50%] rounded-xl  h-screen  mr-0 md:flex flex-col justify-center items-center">
            <img className="h-screen w-full" src={pic_5} alt="/"/>
          </div>
        </div>
    </div>
  )
}

export default Signin