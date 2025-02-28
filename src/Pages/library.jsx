import React, { useEffect } from 'react'
import apiClient from '../spotify'
import { useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const library = () => {
  const [playlists, setPlaylists] = useState([]);

  const navigate = useNavigate();

  const playPlaylist = (id) => {
    navigate('/player', {state:{id:id}})
  };

  //------------- Fetch Playlist ---------------------//

  const FetchPlaylist = async () =>{
    try{
      apiClient.get('me/playlists').then(res => {
        console.log(res.data);
        setPlaylists(res.data.items);
      })
    } catch (error) {
      console.error("Error Fetch API Playlist:", error)
    }
  }

  useEffect(()=>{
    FetchPlaylist();
  },[])
  
  return (
    <div className='screen-container'>
      <div className='w-[94%] h-[94%] p-[3%] flex flex-wrap gap-5 justify-center overflow-x-hidden overflow-y-auto scrollbar-hide'>
        {playlists.map((playlist, i) => (

          playlist?.images?.[0]?.url && (
            <div 
              className='playlist-card group relative hover:scale-[1.05] transition-all duration-500 cursor-pointer' 
              key={playlist.id}
              onClick={() => playPlaylist(playlist.id)}
            >
              <img src={playlist?.images?.[0]?.url} alt="img" className='playlist-image'/>
              <p className='mt-[8px] ml-2 font-bold text-[#c4d0e3]'>{playlist.name.length > 20 ? playlist.name.substring(0, 20)+'...' : playlist.name}</p>
              <p className='font-normal text-[12px] text-[#c4d0e37c] ml-2 my-2'>{playlist.tracks.total} Songs</p>
              <div className=' opacity-0 group-hover:opacity-70 absolute bottom-3 right-3'>
                <AiFillPlayCircle color='#b0c4de' size={45}/>
              </div>

            </div>
          ) 
        ))}
      </div>
    </div>
  )
}

export default library