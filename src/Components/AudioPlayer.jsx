import React from 'react'
import ProgressCircle from './ProgressCircle'

const AudioPlayer = ({currentTrack}) => {
  return (
    <div className='w-full h-[44%] my-[3%]'>
        <div className='w-[37%]'>
            <ProgressCircle
                percentage={75}
                isPlaying={true}
                //image={currentTrack?.images[0]?.url}
                size={300}
                color="#c96850"
            />
        </div>
        <div className='w-[67%]'>

        </div>

    </div>
  )
}

export default AudioPlayer