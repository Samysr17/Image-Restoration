import React from 'react'
import { ReactPhotoCollage } from "react-photo-collage";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const data = location.state;
  const setting = {
    width: '400px',
    height: ['200px', '170px'],
    layout: [1, 3],
    photos: {data},
  };
  console.log({data});
  return (
   <>
  <ReactPhotoCollage  {...setting} />
   </>
  )
}

export default Profile