import React, { useEffect } from 'react'
import apiClient from '../../spotify'
import WidgetCard from './widgetCard'
import { useState } from 'react'

const Widgets = ({artistID}) => {
  const [similar, setSimilar] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [newRelease, setNewRelease] = useState([]);

  console.log("for", artistID)

  useEffect(()=>{
    if(artistID) {
        apiClient
            .get(`/artists/${artistID}/top-tracks`)
            .then((res)=>{
                const a = res.data?.tracks.slice(0, 3) // ดึงมาแค่ 3 array
                setSimilar(a);
            })
            .catch((err) => console.error(err));

        apiClient
            .get(`/artists/${artistID}/albums`) // 
            .then((res) => {
                const a = res.data?.items.slice(1, 4);  // ดึงมาแค่ 3 array
                console.log("API Respone:", a);
                setAlbums(a);
            })
            .catch((err) => console.error(err));
    
        apiClient
            .get(`/browse/new-releases`)
            .then((res) => {
                const a = res.data?.albums.items.slice(0, 3);  // ดึงมาแค่ 3 array
                setNewRelease(a);
            })
            .catch((err) => console.error(err));
    }
  },[artistID])

  return (
    <div className='widgets-body'>
        <WidgetCard title="Top Tracks" similar={similar}/>
        <WidgetCard title="Albums For You" albums={albums}/>
        <WidgetCard title="New Releases" newRelease={newRelease}/>
    </div>
  )
}

export default Widgets