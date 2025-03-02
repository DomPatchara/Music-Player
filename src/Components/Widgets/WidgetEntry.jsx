import React from "react";

const WidgetEntry = ({ title, subtitle, image}) => {
  return (
    <div className="w-full flex items-center mt-[10%]">
      <img src={image} alt={title} className="h-[50px] w-[50px] rounded-2xl mr-2.5" />
      <div className="flex flex-col justify-center">
        <p className="text-[16px]/5 text-[#c9d0e3] mb-1 font-bold">{title}</p>
        <p className="font-normal text-[#c4d0e37c] text-[12px] m-0 ">{subtitle}</p>
      </div>
    </div>
  );
}

export default WidgetEntry