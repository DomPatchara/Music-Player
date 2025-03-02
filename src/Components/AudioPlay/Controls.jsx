import React from 'react'
import { IconContext } from "react-icons";
import { FaPause } from "react-icons/fa";
import { IoPlaySkipBack, IoPlaySkipForward, IoPlay } from "react-icons/io5";

const Controls = ({isPlaying, setIsPlaying, handleNext, handlePrev}) => {
  return (
    <IconContext.Provider value={{ size: "35px", color: "#C4D0E3" }}>
      <div className="controls-wrapper">

        <div className="action-btn" onClick={handlePrev}>
          <IoPlaySkipBack />
        </div>

        <div
          className={ isPlaying ? "play-pause-btn active" : "play-pause-btn"}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? <FaPause /> : <IoPlay />}
        </div>

        <div className="action-btn" onClick={handleNext}>
          <IoPlaySkipForward />
        </div>

      </div>
    </IconContext.Provider>
  )
}

export default Controls