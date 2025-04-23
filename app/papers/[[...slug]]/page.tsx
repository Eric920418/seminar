"use client";
import { useState, useEffect } from "react";

import { Results } from "@/components/Papers/Results";
import { Topics } from "@/components/Papers/Topics";
import { Oral } from "@/components/Papers/Oral";
import { Poster } from "@/components/Papers/Poster";
import { useParams } from "next/navigation";
import Image from "next/image";

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

const query = `
  query paperPage {
    paperPage {
      section4
    }
  }
`;

export default function Page() {
  const [editorBackground, setEditorBackground] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      setEditorBackground(data.paperPage[0].section4.background);
    };
    fetchData();
  }, []);

  const nav = [
    { title: "徵文主題與論文格式", component: <Topics /> },
    { title: "論文摘要審查結果公告", component: <Results /> },
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
      <div className="h-[640px] flex justify-center items-center relative">
        {editorBackground ? (
          <Image
            className="w-full h-full object-cover"
            src={editorBackground}
            alt="會議背景"
            width={1920}
            height={1080}
          />
        ) : (
          <Image
            className="w-full h-full object-cover"
            src="/banner/Group.png"
            alt="會議背景"
          />
        )}
        <div className="text-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
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
                className={`text-20R font-NotoSansTC cursor-pointer transition-colors duration-200 ${
                  focus[index]
                    ? "text-[#008785]"
                    : "text-[#252F3866] hover:text-[#008785]"
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
