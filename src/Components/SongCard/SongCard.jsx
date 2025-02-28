import React from 'react'
import AlbumImage from './AlbumImage'
import AlbumInfo from './AlbumInfo'

const SongCard = ({album}) => {
  return (
    <div className='w-full h-[63%] rounded-t-2xl rounded-bl-2xl bg-[#244988] '>
      <div className='w-[80%] h-full mx-auto flex flex-col justify-center items-center'>
        <AlbumImage url={album?.images?.[0]?.url}/>
        <AlbumInfo album={album}/>
      </div>
    </div>
  )
}

export default SongCard