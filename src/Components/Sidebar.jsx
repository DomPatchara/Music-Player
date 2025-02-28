import React, { useEffect, useState } from 'react'
import SidebarButton from './SidebarButton'
import { MdFavorite } from 'react-icons/md'
import { FaGripfire, FaPlay } from 'react-icons/fa'
import { FaSignOutAlt } from 'react-icons/fa'
import { IoLibrary } from 'react-icons/io5'
import { MdSpaceDashboard } from 'react-icons/md'
import apiClient from '../spotify'

const Sidebar = () => {
  const [image, setImage] = useState("./logo.jpg")

  // Fetch User Profile
  const getprofile = async () => { 
    try { 
    const { data } = await apiClient.get("me");

    console.log(data)
    setImage(data.images[0].url)

    } catch (error) {
      console.error("Error fetching profile:", error.response?.data || error);
  }
};

  useEffect(() => {
   getprofile();
}, [])

  useEffect
  return (
    <div className='w-[100px] h-full flex flex-col justify-between items-center py-10 '>

        <img 
            src={image} 
            className='w-18 rounded-full mb-5'
            alt="profile" 
        />
        
        <div>
            <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard/>}/>
            <SidebarButton title="Trending" to="/trending" icon={<FaGripfire/>}/>
            <SidebarButton title="Player" to="/player" icon={<FaPlay/>}/>
            <SidebarButton title="Favorite" to="/favorite" icon={<MdFavorite/>}/>
            <SidebarButton title="Library" to="/" icon={<IoLibrary/>}/>
        </div>

        <SidebarButton title="Sign Out" to="" icon={<FaSignOutAlt/>}/>
        
    </div>
  )
}

export default Sidebar