import React from 'react'
import WidgetEntry from './WidgetEntry';

const widgetCard = ({title, similar, featured, newRelease}) => {
    console.log(
        "similar",
        similar,
        "featured",
        featured,
        "newRelease",
        newRelease
      );
  return (
    <div className='widgetcard-body'>
        <p className="text-[#c4d0e3] font-extrabold text-[18px]">{title}</p>
        {similar
            ? similar.map((artist, i) => (
                <WidgetEntry
                key={i}
                title={artist?.name.length > 20 ? artist?.name.slice(0,20) + '...' : artist?.name}
                subtitle={"Popularity  : " + artist?.popularity}
                image={artist?.album?.images[0].url}
                />
            ))
            : featured
            ? featured.map((playlist, i) => (
                <WidgetEntry
                key={i}
                title={playlist?.name}
                subtitle={playlist?.tracks?.total + " Songs"}
                image={playlist?.images[0]?.url}
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

export default widgetCard