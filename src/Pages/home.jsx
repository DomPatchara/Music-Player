import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Library from './library'
import Feed from './feed'
import Player from './player'
import Trending from './trending'
import Favorite from './favorite'
import Sidebar from '../Components/Sidebar'
import Login from './login'
import { setClientToken } from '../spotify'
import { getStoredToken, storeTokens } from '../auth'

const home = () => {

  const [token, setToken] = useState("")

  useEffect(()=>{
    const storedToken = getStoredToken();
    const hash = new URLSearchParams(window.location.hash.substring(1));
    console.log(storedToken);
      // clear hash

    if (!storedToken && hash.get("access_token")) {   // ถ้าไม่มี token & มีhash 
      const _token = hash.get("access_token"); // เลือกเฉพาะ access_token
      const _refreshToken = hash.get("refresh_token");

      storeTokens(_token, _refreshToken);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(storedToken);
      setClientToken(storedToken);
    }

    window.location.hash = ""  // clear URL hash
  },[])

  return !token ? (
    <Login/>
    ) : (
    <Router>
      <div className='main-body'>
        <Sidebar/>
         <Routes>
              <Route path='/' element={<Library/>}/>
              <Route path='/feed' element={<Feed/>}/>
              <Route path='/player' element={<Player/>}/>
              <Route path='/trending' element={<Trending/>}/>
              <Route path='/favorite' element={<Favorite/>}/>
          </Routes>
      </div>
    </Router>
  )
}

export default home