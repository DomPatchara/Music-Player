import { circle } from 'motion/react-client';
import React from 'react'

// import { assets } from '../../public/asset';


const Circle = ({color, percentage, size, strokeWidth}) => {
  const radius = size / 2 - 10;   // เส้นรัศมี
  const circ = ((2*Math.PI*radius) - 20);  // เส้นรอบวง
  const strokePct = ((100 - Math.round(percentage)) * circ) / 100;

  return (
    <circle className='rotate-93 origin-center transition-all duration-100 ease-in-out'
      r={radius}
      cx="50%"
      cy="50%"
      fill="transparent"
      stroke={strokePct !== circ ? color : ""}
      strokeWidth={strokeWidth}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  )
}

const ProgressCircle = ({percentage, isPlaying, size, color, image}) => {
  return (
    <div className='flex justify-center items-center'>
      <svg width={size} height={size}>
        <g>
          <Circle strokeWidth={"0.4rem"} color="#3b4f73" size={size}/>
          <Circle strokeWidth={"0.6rem"} color={color} percentage={percentage} size={size}/>
        </g>
        <defs>
          <clipPath id='myCircle'>
            <circle cx="50%" cy="50%" r={size/2-30} fill='#ffffff'/>
          </clipPath>
          <clipPath id='myInnerCircle'>
            <circle cx="50%" cy="50%" r={size/2-100} fill='#ffffff'/>
          </clipPath>
        </defs>
        <image 
          className={isPlaying ? "active" : ""} 
          x={30} 
          y={30} 
          width={2*(size/2 - 30)} 
          height={2*(size/2 - 30)} 
          href='./disc.png'
          clipPath="url(#myCircle)"
        />
        <image
          className={isPlaying ? "active" : ""} 
          x={100} 
          y={100} 
          width={2*(size/2 - 100)} 
          height={2*(size/2 - 100)} 
          href={image}
          clipPath="url(#myInnerCircle)"
        />
      </svg>
    </div>
  )
}

export default ProgressCircle