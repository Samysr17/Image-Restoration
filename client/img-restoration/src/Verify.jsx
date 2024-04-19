import React from 'react'
import pic_4 from "./assets/pic_4.jpg"
import { UserAuth } from './Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Verify = () => {
    const {user}=UserAuth();
    const navigate=useNavigate();
    console.log(user);
    const handleclick=async(e)=>{
        e.preventDefault();
        if(user?.emailVerified===true){
            navigate("/Signin");
          }else{
            window.alert("Please Verify Email to Continue or Reload if Verified")
          }
    }
  return (
    <div className="">
    <div className=" bg-black w-full h-screen flex justify-center ">
      <div className='md:w-[50%] flex  justify-center items-center '>
         <div className="flex flex-col md:h-[60%] md:w-[60%] ">
           <p className="text-white text-3xl ">Please Verify your E-mail</p>
          
           <button onClick={handleclick} className="py-3 mt-32 bg-black border-2 text-white border-white rounded-xl">Continue</button>

         </div>
      </div>
      <div className=" hidden  md:w-[50%] rounded-xl  md:h-screen  mr-0 md:flex md:flex-col justify-center items-center">
        <img className="h-screen w-full" src={pic_4} alt="/"/>
      </div>
    </div>
</div>
  )
}

export default Verify