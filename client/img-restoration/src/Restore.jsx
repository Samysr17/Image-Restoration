import React from 'react'
// import * as tf from '@tensorflow/tfjs';
import Upscaler from 'upscaler';
import Select from 'react-select';
import { UserAuth } from './Context/AuthContext'
import { db } from './Firebase';
import { arrayUnion,doc,updateDoc,onSnapshot} from 'firebase/firestore';
import { useState ,useEffect} from 'react';
import {useDropzone} from 'react-dropzone';
import { useCallback } from 'react';
import { Link } from 'react-router-dom'
import { FaPlusCircle } from "react-icons/fa";
import { ImgComparisonSlider } from 'img-comparison-slider';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Restore=()=>{
  const {user}=UserAuth();
  const [saved,setsaved]=useState(false);
  const [dec,setdec]=useState(0);
  const options = [
    { value: 'Restoration', label: 'Restoration',color:'black' },
    { value: 'Collage', label: 'Collage',color:'black'  },
    { value: 'Home', label: 'Home',color:'black'  },
    { value: 'Denoising', label: 'Denoising',color:'black'  }
  ]
  useEffect(()=>{
    onSnapshot(doc(db,'users',`${user?.email}`),(doc)=>{
     setdec(doc.data()?.credits);
    })
   },[user?.email])
    const upscaler = new Upscaler();
    const [image,setimage]=useState("");
    const [model,setmodel]=useState(false);
    const [images,setimages]=useState([]);
    const[error,seterror]=useState(false);
    const onDrop = useCallback(acceptedFiles => {
      setimages(acceptedFiles.map(file=>
        Object.assign(file,{
          source:URL.createObjectURL(file)
        })
       
      ));
    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop});

    const handleclick=()=>{
        if(images.length>1){
          seterror(error)
          window.alert("Please Discard and select only 1 image");
          return ;
        }
        if(images.length===0){
          window.alert("Please select an Image");
          return ;
        }
        images.map(file=>{
          upscaler.upscale(file.source).then(upscaledImage => {
            const img = document.createElement("img")
            img.src = upscaledImage
            // document.body.appendChild(img)
            setimage(img.src);
            setmodel(!model);
            console.log(upscaledImage);
          })
        })
    }
   
    const handledis=()=>{
      window.location.reload();
    }
    const uid=doc(db,'users',`${user?.email}`);
    const save=async()=>{
     if(user?.email){
      setsaved(true);
      await updateDoc(uid,{
        saved_r_images:arrayUnion({
          img:image
        }),
        credits:dec-20
      })
     }
    }
  return (
    <div className="h-auto w-full colored">
    <div className=" w-full h-auto">
        <div className="flex justify-between h-[80px] p-6 w-full  text-white">
           <div className="ml-8">LOGO</div>
           <div className="flex space-x-16 mr-8">
           
           <Select className=" text-black" options={options}/>
              <p><Link to="/Profile">{user.email}</Link></p>
              <button className="bg-white rounded-md  w-24 text-black">{dec} credits</button>
              <p>Account</p>
           </div>
        </div>
        </div>
        <div className="flex flex-col justify-center items-center">
           <div className="w-[40%] h-[500px] text-white flex flex-col justify-center items-center mt-[3%] border-dashed border-2 border-black">
       
           <div {...getRootProps()}>
          <input {...getInputProps()} />
                {
        model ?
          
          <p></p> :(
            <div className="flex flex-col justify-center">
               <FaPlusCircle size={20} className="mt-[5%] ml-[49%] items-center text-white " /> 
          <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          )
         }
       <div className="flex flex-col items-center ">
        </div>
           </div>
           <div className="flex space-x-4 justify-between">
            <div className="flex-col">
            {model?(<span className="ml-[20%]">Your Image</span>):<div></div>}
            {images?.map(file=>(
          <img className="h-[200px] mt-4"  src={file.source} alt="/"/>
       ))}
           </div>
           {model?(<div className="flex-col">
           <span className="ml-[20%]">Restored</span>
           <img download={image} className="h-[200px] mt-4"  src={image} alt=""></img>
           </div>):<div></div>}
           </div>
           {model?(<div><div className="flex"><span>Done in</span><div>{window.performance.now()/10000}</div><span>s</span></div><button onClick={save} className="mt-8 ml-[20%] px-6 py-2 border-2 border-white bg-transparent text-white rounded-xl ">Save</button></div>):<div></div>}
           </div>
          
           <div className="flex justify-center space-x-4 p-8">
             {/* <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"/>
<ToastContainer /> */}
 
             <button onClick={handleclick}  className="px-6 py-2 border-2 border-white bg-transparent text-white rounded-xl">Continue</button>
             <button onClick={handledis} className="px-6 py-2 border-2 border-white bg-transparent text-white rounded-xl">Discard</button>
           </div>
           <div className="flex flex-col justify-center text-white">
          {/* <div className="flex flex-col"> */}
           <span >If Image more than 5 kb please Compress</span>
           <a href="https://imagecompressor.com/"><button className="ml-[35%]">Compress Here</button></a>
           {/* </div> */}
           </div>
           <div className="">
            <img-comparison-slider>
            {images?.map(file=>(
          <img slot="first" className="h-[400px]"  src={file.source} alt="/"/>
       ))}
  <img className="h-[400px]" slot="second" src={image} />
        </img-comparison-slider>
            </div>

        </div>
        </div>
  )
}

export default Restore