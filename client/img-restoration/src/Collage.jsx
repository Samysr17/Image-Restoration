import React from 'react'
import { FaPlusCircle } from "react-icons/fa";
import Select from 'react-select';

const Collage = () => {
    const options = [
        { value: 'Restoration', label: 'Restoration',color:'black' },
        { value: 'strawberry', label: 'Collage',color:'black'  },
        { value: 'vanilla', label: 'Slider',color:'black'  },
        { value: 'Watermark Remover', label: 'Watermark Remover',color:'black'  }
      ]
  return (
    <div className="h-auto w-full bg-[#DFD5D5]">
    <div className="bg-[#1976D2] w-full h-auto">
        <div className="flex justify-between h-[80px] p-6 w-full  text-white">
           <div className="ml-8">LOGO</div>
           <div className="flex space-x-16 mr-8">
           <Select options={options} />
              <p>About</p>
              <p>UserName</p>
              <button className="bg-white rounded-md  w-24 text-black">100 Credits</button>
              <p>Account</p>
           </div>
        </div>
        </div>
        <div className="flex flex-col justify-center items-center">
           <div className="w-[40%] h-[500px] flex flex-col justify-center items-center mt-[5%] border-dashed border-2 border-black">
             <FaPlusCircle size={20} className="mt-[5%]" />
             <p>Drop your Images here</p>
            
           </div>
           <div className="flex justify-center space-x-4 p-8">
             <button className="px-6 py-2 border-2 border-[#1976D2] bg-[#1976D2] text-white rounded-xl">Continue</button>
             <button className="px-6 py-2 border-2 border-[#1976D2] bg-[#1976D2] text-white rounded-xl">Discard</button>
           </div>
        </div>
        </div>
  )
}

export default Collage