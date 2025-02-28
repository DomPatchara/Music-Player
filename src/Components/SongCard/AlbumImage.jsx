import React from 'react'

const AlbumImage = ({url}) => {
  return (
    <div className='w-full flex justify-center items-center relative lg:mt-4'>
        <img src={url} alt="album art" className='w-full aspect-square rounded-3xl z-10 ' />
        
        <div className='absolute top-4 md:top-3 w-full z-5'>
            <img src={url} alt="shadow" className='rounded-3xl blur-[5px] '/>
        </div>
    </div>
  )
}

export default AlbumImage