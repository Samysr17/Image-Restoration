import React from 'react'
import {useDropzone} from 'react-dropzone'
import { useState } from 'react';
import { useCallback } from 'react';
import Upscaler from 'upscaler';

const Profile = () => {
  const [images,setimages]=useState([]);
  const[image,setimage]=useState("");
  const [model,setmodel]=useState(false);
  const [error,seterror]=useState("");
  const upscaler=new Upscaler();
  // upscaler.upscale(exampleImage).then(upscaledImage => {
  //   const img = document.createElement("img")
  //   img.src = upscaledImage
  //   // document.body.appendChild(img)
  //   setimage(img.src);
  //   setmodel(!model);
  //   console.log(upscaledImage);
    
  // });
  const onDrop = useCallback(acceptedFiles => {
    setimages(acceptedFiles.map(file=>
      Object.assign(file,{
        source:URL.createObjectURL(file)
      })
     
    ));
  }, [])
  const {getRootProps, getInputProps,isDragActive} = useDropzone({onDrop});
  const handleclick=()=>{
      if(images.length>1){
        seterror(error)
        window.alert("Please Discard and select only 1 image");
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
  return (
   <>
   <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
       {images?.map(file=>(
          <img className="w-[20%]"  src={file.source} alt="/"/>
          
       ))}
       <button onClick={handleclick} className="p-2 border-black border-solid">Restore</button>
       <button onClick={handledis} className="p-2 border-black border-solid">Discard</button>
       {model?<img src={image} alt=""></img>:<div></div>}
    </div>
   </>
  )
}

export default Profile