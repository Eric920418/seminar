import React from "react";
import Image from "next/image";

export const Button = ({
  text,
  textSize,
  textColor,
  bgColor,
  padding,
  src,
  onClick,
}) => {
  return (
    <div
      className={`w-fit ${bgColor} flex items-center gap-2 ${padding}  rounded-[100px] cursor-pointer`}
      onClick={onClick}
    >
      <span className={`${textColor} ${textSize} w-[150px]  text-nowrap`}>
        {text}
      </span>
      <Image src={src} alt="Example" width={32} height={32} />
    </div>
  );
};
