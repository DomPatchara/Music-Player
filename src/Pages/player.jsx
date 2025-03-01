import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import apiClient from '../spotify';
import SongCard from '../Components/SongCard/SongCard';
import Queue from '../Components/Queue';
import AudioPlayer from '../Components/AudioPlay/AudioPlayer';
import Widgets from '../Components/Widgets';

const player = () => {
  const location = useLocation();

  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if(location.state) {
      apiClient.get("playlists/" + location.state?.id + "/tracks")
      .then(res => {
        console.log(res.data.items);
        setTracks(res.data.items);
        setCurrentTrack(res?.data?.items?.[0]?.track);
        console.log(currentTrack)
      })
    } 
  },[location.state])

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track)
  },[currentIndex, tracks])

  return (
    <div className='screen-container flex'>
      <div className='leftPlay-body'>
        <AudioPlayer 
          currentTrack={currentTrack} 
          total={tracks} 
          currentIndex={currentIndex} 
          setCurrentIndex={setCurrentIndex}
        />
        <Widgets artistID={currentTrack?.album?.artists[0]?.id}/>
      </div>
      <div className='rightPlay-body'>
        <SongCard album={currentTrack?.album}/>
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex}/>
      </div>
    </div>
  )
}

export default player