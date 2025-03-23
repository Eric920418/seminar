"use client";

import { useState, useEffect, type ReactNode } from "react";

import { Project } from "@/components/Exhibition/Project";
import { Excellence } from "@/components/Exhibition/Excellence";
function FadeIn({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
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

export default function Page() {
  const nav = [
    { title: "作品展示​​", component: <Project /> },
    { title: "卓越的學習與教學​短講​流程", component: <Excellence /> },
  ];

  const [focus, setFocus] = useState(nav.map((_, i) => i === 0));
  const toggle = (navIndex: number) => {
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
          <div className="text-third text-16M ">Project Showcase</div>
          <div className="text-black text-48M ">​作品展示​</div>
        </div>
      </div>
      <div className="pb-[160px] pt-[128px] mx-auto w-fit">
        <div className="max-w-[1664px] mx-auto flex space-x-[32px]">
          <div className="w-[304px] flex flex-col gap-[24px]">
            {nav.map((item, index) => (
              <div
                key={index}
                className={`text-20R font-NotoSansTC ${
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
