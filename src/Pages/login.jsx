import React from 'react'
import { loginEndpoint } from '../spotify'

const login = () => {
  return (
    <div className='login-page'>
        <img 
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" 
            alt="Logo Spotify"
            className='w-[30%]' 
        />

        <a href={loginEndpoint}>
            <div className='login-btn'>Login</div>
        </a>
    </div>
  )
}

export default login