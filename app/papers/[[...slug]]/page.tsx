"use client";
import { useState, useEffect } from "react";

import { Results } from "@/components/Papers/Results";
import { Topics } from "@/components/Papers/Topics";
import { Oral } from "@/components/Papers/Oral";
import { Poster } from "@/components/Papers/Poster";
import { useParams } from "next/navigation";

function FadeIn({ children }: { children: React.ReactNode }) {
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

export default function Page() {
  const nav = [
    { title: "論文摘要審查結果公告", component: <Results /> },
    { title: "徵文主題與論文格式", component: <Topics /> },
    { title: "口頭發表場次", component: <Oral /> },
    { title: "海報發表場次", component: <Poster /> },
  ];
  const params = useParams();
  const { slug } = params;

  const [focus, setFocus] = useState(nav.map((_, i) => i === 0));
  const toggle = (navIndex: number) => {
    setFocus((prev) => prev.map((_, i) => i === navIndex));
  };

  useEffect(() => {
    if (slug) {
      toggle(Number(slug[0])); // 將字串轉為數字
    }
  }, [slug]);

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
          <div className="text-third text-16M ">ICTE​ Papers</div>
          <div className="text-black text-48M ">ICTE論文</div>
        </div>
      </div>
      <div className="pb-[64px] desktop:pb-[160px] pt-[64px] desktop:pt-[128px] mx-auto w-fit">
        <div className="max-w-[1664px] mx-auto flex space-x-[32px]">
          <div className="hidden w-[304px] desktop:flex flex-col gap-[24px]">
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
