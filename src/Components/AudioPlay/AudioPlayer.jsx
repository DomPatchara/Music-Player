import React, { useEffect, useRef } from 'react'
import ProgressCircle from './ProgressCircle'
import WaveAnimation from './WaveAnimation';
import { useState } from 'react';
import Controls from './Controls';

const AudioPlayer = ({currentTrack, currentIndex, setCurrentIndex, total}) => {

  const artists = [];
  currentTrack?.album?.artists?.forEach((artist) => {
      artists.push(artist.name) // push คือ add el.name to the 'artist' array
})

  // แปลงหน่วย ms --> minute Ex.  223968 ms ----> 3:43 minute
  const duration_ms = currentTrack?.duration_ms;
  const duration_m = Math.floor(duration_ms / 60000) + ':' + Math.floor((duration_ms % 60000)/1000).toString().padStart(2, "0")

  const [isPlaying, setIsPlaying] = useState(true);
  const [trackProgress, setTrackProgress] = useState(0);
  const audioSrc = total[currentIndex]?.track.preview_url;

  console.log(audioSrc) // chechk audiofile

  const audioRef = useRef(new Audio(total[0]?.track?.preview_url));
  
  const intervalRef = useRef();

  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const currentPercentage = duration ? ( trackProgress / duration ) * 100 : 0;


  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if(audioRef.current.ended){
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    },[1000]);
  }

  useEffect(()=>{
    if(isPlaying && audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  },[isPlaying])

  useEffect(()=>{
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc);

    setTrackProgress(audioRef.current.currentTime);

    if(isReady.current){
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true
    }
  },[currentIndex])

  useEffect(()=>{
    audioRef.current.pause();
    audioRef.current = new Audio(audioSrc)
  },[])

  const handleNext = () => {
    if(currentIndex < total.length - 1){
      setCurrentIndex(currentIndex + 1)
    } else {
      setCurrentIndex(0);
    }
  }

  const handlePrev = () => {
    if(currentIndex - 1 < 0) {
      setCurrentIndex(currentIndex - 1)
    } else {
      setCurrentIndex(currentIndex - 1 )
    }
  }

  return (
    <div className='w-full h-[44%] my-[3%] flex flex-col lg:flex-row'>
        <div className='md:w-[37%]'>
            <ProgressCircle
                percentage={currentPercentage}
                isPlaying={true}
                image={currentTrack?.album?.images[0].url}
                size={300}
                color="#c96850"
            />
        </div>
        <div className='md:w-[67%] mt-2 md:mt-0 flex flex-col justify-evenly items-center'>
            <p className='text-center text-[#c4d0e3] font-bold text-3xl md:text-5xl line-clamp-2 p-2'>
              {currentTrack?.name}
            </p>
            <p className='text-[#9aa9c2] font-medium text-[14px]'>
              {artists}
            </p>

            <div className='w-full flex flex-col items-center'>
              <div className='flex w-[50%] justify-between items-center mb-[20px]'>
                <p className='duration'>0:{Math.round(trackProgress)}</p>
                <WaveAnimation isPlaying={isPlaying}/>
                <p className='duration'>{duration_m}</p>
              </div>
              <Controls
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                handleNext = {handleNext}
                handlePrev = {handlePrev}
                total={total}
              />
            </div>
        </div>

    </div>
  )
}

export default AudioPlayer