"use client";
import { useState, useEffect } from "react";
import { Agenda } from "@/components/Meeting/Agenda";
import { ImportantDates } from "@/components/Meeting/ImportantDates";
import { Presentation } from "@/components/Meeting/Presentation";
import { Online } from "@/components/Meeting/Online";
import { Transportation } from "@/components/Meeting/Transportation";
import { Accommodation } from "@/components/Meeting/Accommodation";
import { Map } from "@/components/Meeting/Map";
import { Origin } from "@/components/Meeting/Origin";
import { Purpose } from "@/components/Meeting/Purpose";
import { Activity } from "@/components/Meeting/Activity";

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

const query = `
  query meetingPage {
    meetingPage {
      section7
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
      console.log(data);
      console.log(data.meetingPage[0]);
      setEditorBackground(data.meetingPage[0].section7?.content4);
    };
    fetchData();
  }, []);

  const nav = [
    { title: "緣起", component: <Origin /> },
    { title: "目的", component: <Purpose /> },
    { title: "活動類型", component: <Activity /> },
    { title: "會議議程", component: <Agenda /> },
    { title: "重要時程", component: <ImportantDates /> },
    { title: "發表規則", component: <Presentation /> },
    { title: "線上報名與規則", component: <Online /> },
    { title: "交通", component: <Transportation /> },
    { title: "住宿", component: <Accommodation /> },
    { title: "會議平面圖", component: <Map /> },
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

  console.log(editorBackground);

  return (
    <div className="bg-[#FAFBFD]">
      <div
        className="h-[640px] flex justify-center items-center"
        style={{
          backgroundImage: editorBackground
            ? `url(${editorBackground})`
            : "url('/banner/Group.png')",
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
      <div className="pb-[64px] desktop:pb-[160px] pt-[64px] desktop:pt-[128px] mx-auto w-full desktop:w-fit">
        <div className="w-full desktop:max-w-[1312px]   mx-auto flex space-x-[32px]">
          <div className="hidden desktop:w-[304px] w-fit text-nowrap desktop:flex flex-col gap-[24px]">
            {nav.map((item, index) => (
              <div
                key={index}
                className={`text-20R cursor-pointer transition-colors duration-200 ${
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
