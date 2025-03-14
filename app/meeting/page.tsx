"use client";
import { useState, useEffect } from "react";
import Image from "next/Image";

import { Agenda } from "@/components/Meeting/Agenda";
import { ImportantDates } from "@/components/Meeting/ImportantDates";
import { Presentation } from "@/components/Meeting/Presentation";
import { Online } from "@/components/Meeting/Online";
import { Transportation } from "@/components/Meeting/Transportation";
import { Accommodation } from "@/components/Meeting/Accommodation";
import { Map } from "@/components/Meeting/Map";

function FadeIn({ children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // mount 後立即改變狀態以觸發淡入動畫
    setVisible(true);
  }, []);

  return (
    <div
      className={`transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

export default function page() {
  const nav = [
    { title: "會議議程", component: <Agenda /> },
    { title: "重要時程", component: <ImportantDates /> },
    { title: "發表規則", component: <Presentation /> },
    { title: "線上報名與規則", component: <Online /> },
    { title: "交通", component: <Transportation /> },
    { title: "住宿", component: <Accommodation /> },
    { title: "會議平面圖", component: <Map /> },
  ];

  const [focus, setFocus] = useState(nav.map((_, i) => i === 0));
  const toggle = (navIndex) => {
    setFocus((prev) => prev.map((_, i) => i === navIndex));
  };

  return (
    <div className="bg-[#FAFBFD]">
      <div
        className="h-[640px] flex justify-center items-center"
        style={{
          backgroundImage: "url('/banner/Group.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center">
          <div className="text-third text-16M ">ICTE​ info</div>
          <div className="text-black text-48M ">ICTE會議資訊</div>
        </div>
      </div>
      <div className="pb-[160px] pt-[128px] mx-auto w-fit">
        <div className="max-w-[1312px] mx-auto flex space-x-[32px]">
          <div className="w-[304px] flex flex-col gap-[24px]">
            {nav.map((item, index) => (
              <div
                key={index}
                className={`text-20R  ${
                  focus[index] ? "text-secondary" : "text-[#252F3866]"
                }`}
                onClick={() => toggle(index)}
              >
                {item.title}
              </div>
            ))}
          </div>

          {nav.map((item, index) => {
            if (focus[index]) {
              return <FadeIn key={index}>{item.component}</FadeIn>;
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
