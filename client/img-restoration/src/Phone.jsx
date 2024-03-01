import React from 'react'
import pic_2 from "./assets/pic_2.jpg"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { UserAuth } from './Context/AuthContext'

const Phone = () => {
    const {recaptcha}=UserAuth();
    const [phone,setphone]=useState('');
    const [error,seterror]=useState('');
    const [otp,setotp]=useState('');
    const [result, setResult] = useState("");
    const [flag,setflag]=useState(false);
    const navigate=useNavigate();
    const handleClick=async(e)=>{
       e.preventDefault();
       seterror('');
       if(phone==="" || phone===undefined){
        return seterror("Please enter a valid phone number");
       }
       try{
        const response=await recaptcha(phone);
        console.log(response);
        setResult(response);
        setflag(true);
       }catch(error){
        seterror(error.message);
       }
       console.log(phone);
    }
    const verifyOtp = async (e) => {
        e.preventDefault();
        seterror("");
        if (otp === "" || otp === null) return;
        try {
          await result.confirm(otp);
          navigate("/info");
        } catch (err) {
          seterror(err.message);
        }
      }
  return (
    <div className="">
    <div className=" bg-[#1976D2] w-full h-screen flex justify-center ">
      <div className='md:w-[50%] flex  justify-center items-center '>
         <div className="flex flex-col md:h-[60%] md:w-[60%]">
           <p className="text-white text-3xl ">Let's Create Your Account</p>
           {!flag?<div className="flex flex-col"><span className="text-white mt-8">Mobile Number</span>
           <input onChange={(e)=>setphone(e.target.value)}  className="bg-transparent mt-2 bg-white border-white border-2 rounded-xl px-6 py-2"></input>
           <div className="mt-4" id="recaptcha-container"/>
           <button onClick={handleClick} className="py-3 mt-4 bg-white rounded-xl">Get OTP</button>
           </div>:<div className="flex flex-col"><span className="text-white mt-8">Enter Otp</span>
           <input onChange={(e)=>setotp(e.target.value)}  className="bg-transparent mt-2 bg-white border-white border-2 rounded-xl px-6 py-2"></input>
           <button onClick={verifyOtp} className="py-3 mt-4 bg-white rounded-xl">Get OTP</button>
           </div>
           }
           {error ?<p className='text-red-700'>{error}</p>:null}
           <div className='flex justify-between items-center text-sm text-white mt-2'>
              <p>
                <input className='mr-2' type='checkbox' />
                Remember me
              </p>
              <p>Need Help?</p>
            </div>

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

export default Phone