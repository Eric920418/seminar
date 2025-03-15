"use client";
import { useState } from "react";

import { PeopleCard } from "@/components/Speech/PeopleCard";
import { PDFViewer } from "@/components/PDFViewer";

export const Oral = () => {
  const card = [
    { title: "場次一", content: "師培區域網絡建置與協作" },
    { title: "場次一", content: "師培區域網絡建置與協作" },
    { title: "場次一", content: "師培區域網絡建置與協作" },
    { title: "場次一", content: "師培區域網絡建置與協作" },
    { title: "場次一", content: "師培區域網絡建置與協作" },
    { title: "場次一", content: "師培區域網絡建置與協作" },
  ];

  const [focus, setFocus] = useState(card.map(() => false));

  return (
    <div className="flex flex-1 flex-col justify-start max-w-[976px]">
      <div className="text-16M text-primary ">Oral Presentation Sessions</div>
      <div className="relative w-fit">
        <div className="text-black text-48M  relative z-10">口頭發表場次</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>
      <div className="mt-[64px] grid grid-cols-4 gap-[32px]">
        {card.map((item, index) => (
          <div
            key={index}
            className={`p-[24px] rounded-[24px]  w-[220px] transition-all ease-in-out duration-500  ${
              focus[index] ? "bg-third" : "bg-[#F4F7FD]"
            } `}
            onClick={() =>
              setFocus((prev) => prev.map((f, i) => (i === index ? !f : false)))
            }
          >
            <div
              className={` text-16M transition-all ease-in-out duration-500  ${
                focus[index] ? "text-white" : "text-[#252F38B2]"
              }`}
            >
              {item.title}
            </div>
            <div
              className={`mt-[8px] text-[#252F38B2] text-16M transition-all ease-in-out duration-500 ${
                focus[index] ? "text-white" : "text-[#252F38B2]"
              }`}
            >
              {item.content}
            </div>
          </div>
        ))}
      </div>
      <PeopleCard />
      <div className="mt-[64px] rounded-[40px] bg-[#F4F7FD]">
        <PDFViewer />
      </div>
    </div>
  );
};
