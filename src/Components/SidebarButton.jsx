import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { IconContext } from 'react-icons'


const SidebarButton = ({to, icon, title}) => {

    const location = useLocation();

    const isActive = location.pathname === to;

  return (
    <Link to={to}>
        <div className={`text-white/80 flex flex-col justify-center items-center h-[60px] w-[60px] rounded-2xl my-3 hover:bg-[#4a5c6a]/50 hover:scale-[1.05] transition-all duration-300
                          ${isActive ? 'bg-[#4a5c6a] scale-[1.05]' : ''}`}>
            <IconContext.Provider value={{size: "24px"}}>
                {icon}
                <p className='mx-auto font-semibold text-[14px]'>{title}</p>
            </IconContext.Provider>
        </div>    
    </Link>
  )
}

export default SidebarButton