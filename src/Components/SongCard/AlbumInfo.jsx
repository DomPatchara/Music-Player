import React from 'react'
import { motion } from 'motion/react';

const AlbumInfo = ({album}) => {

    const artist = [];
    album?.artists?.forEach(el => {
        artist.push(el.name) // push คือ add el.name to the 'artist' array
    })
  return (
    <div className='w-full mx-auto flex flex-col mt-3 '>
        <div className='text-[20px] font-bold text-[#c3d0e3] w-full overflow-hidden'>
            <motion.div
            animate={{ x: ["100%", "-100%"]}}
            transition={{
                duration: 10,
                repeatType: 'loop',
                repeat: Infinity,
                ease: 'linear'
            }}
            className='whitespace-nowrap inline-block pl-[30%] mt-1'
            >
                <p>{album?.name + " - " + artist?.join(", ")}</p>
            </motion.div>
        </div>
        <div className='mt-2 text-[14px] md:text-[15px] font-medium text-[#c3d0e3]'>
            <p>
                {`${album?.name} is an ${album?.album_type} by ${artist?.join(", ")}
                 with ${album?.total_tracks} track(s)`}
            </p>
        </div>
        <div className='text-[12px] font-normal text-[#c3d0e3] my-3 '>
            <p>Release Date: {album?.release_date}</p>
        </div>
    </div>
  )
}

export default AlbumInfo