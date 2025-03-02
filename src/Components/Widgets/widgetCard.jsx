import React from 'react'
import WidgetEntry from './WidgetEntry';

const WidgetCard = ({title, similar, albums, newRelease}) => {
    console.log(
        "similar",
        similar,
        "albums",
        albums,
        "newRelease",
        newRelease
      );
  return (
    <div className='widgetcard-body'>
        <p className="text-[#c4d0e3] font-bold text-[19px]">{title}</p>
        {similar
            ? similar.map((artist, i) => (
                <WidgetEntry
                key={i}
                title={artist?.name.length > 20 ? artist?.name.slice(0,20) + '...' : artist?.name}
                subtitle={"Popularity  : " + artist?.popularity}
                image={artist?.album?.images[0].url}
                />
            ))
            : albums
            ? albums.map((album, i) => (
                <WidgetEntry
                key={i}
                title={album?.name}
                subtitle={album?.total_tracks + " Songs"}
                image={album?.images[0]?.url}
                />
            ))
            : newRelease
            ? newRelease.map((album, i) => (
                <WidgetEntry
                key={i}
                title={album?.name}
                subtitle={album?.artists[0]?.name}
                image={album?.images[2]?.url}
                />
            ))
            : null}
    </div>
  )
}

export default WidgetCard