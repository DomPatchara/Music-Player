import React, { useEffect } from 'react'
import apiClient from '../../spotify'
import WidgetCard from './widgetCard'
import { useState } from 'react'

const Widgets = ({artistID}) => {
  const [similar, setSimilar] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [newRelease, setNewRelease] = useState([]);

  console.log("for", artistID)

  useEffect(()=>{
    if(artistID) {
        apiClient
            .get(`/artists/${artistID}/top-tracks`)
            .then((res)=>{
                console.log("API Respone:", res.data);
                const a = res.data?.tracks.slice(0, 3) // ดึงมาแค่ 3 array
                setSimilar(a);
            })
            .catch((err) => console.error(err));

        apiClient
            .get(`/browse/featured-playlists`) // ดึงยังไม่ได้ ไม่ได้สิทธิดึงอันนี้
            .then((res) => {
                const a = res.data?.playlists.items.slice(0, 3);  // ดึงมาแค่ 3 array
                setFeatured(a);
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
        <WidgetCard title="Top Tracks" similar={similar} />
        <WidgetCard title="Made For You" featured={featured} />
        <WidgetCard title="New Releases" newRelease={newRelease} />
    </div>
  )
}

export default Widgets