import { div } from 'motion/react-client'
import React from 'react'

const Queue = ({tracks, setCurrentIndex}) => {
  console.log(tracks);
  
  return (
    <div className='queue-container'>
      <div className='h-[85%] w-[80%] flex flex-col justify-between mx-auto'>
        <div className='w-full text-[20px]  my-5 font-bold text-white text-left'>
          Up Next
        </div>
        <div className='h-[80%] overflow-y-auto scrollbar-hide flex flex-col items-center '>
          {tracks?.map((track, i)=>(
            <div 
              key={i}
              className='w-full flex justify-between py-1 text-[14px] font-medium text-white 
                            hover:scale-[0.95] transition-all ease duration-200 cursor-pointer'
              onClick={() => setCurrentIndex(i)}
            >
              <p className=''>{track?.track?.name.length > 15 ? track?.track?.name.substring(0,15) + '...' : track?.track?.name}</p>
              <p>
                {Math.floor(track?.track?.duration_ms / 60000) +
                ':' + Math.floor((track?.track?.duration_ms % 60000)/1000).toString().padStart(2, "0")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Queue