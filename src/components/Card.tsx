import React from "react";

export const Card = ({ index, title }) => {
  return (
    <div className="bg-[#FFFFFF] p-[32px] rounded-[40px]">
      <div className="w-[48px] h-[48px] rounded-[40px] bg-primary flex justify-center items-center">
        <div className="text-[#FFFFFF] text-20M ">{index}</div>
      </div>
      <div className="text-black text-36M mt-[16px] ">{title}</div>
      <div className="mt-[32px] w-[240px] h-[204px]">
        <div className="flex">
          <div className="text-primary text-20M ">2025/1/31&nbsp;~&nbsp;</div>
          <div className="line-through text-[#252F3880] text-20M ">5/31</div>
        </div>
        <div className="line-through text-[#252F3880] text-20M ">
          延長至 2025/8/10
        </div>
        <div className="line-through text-[#252F3880] text-20M ">
          延長至 2025/8/27
        </div>
        <div className=" text-primary text-20M ">延長至 2025/9/12</div>
      </div>
    </div>
  );
};
