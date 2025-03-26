"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
const query = `
  query meetingPage {
    meetingPage {
      section4
    }
  }
`;

export const Online = () => {
  const [editorOnline, setEditorOnline] = useState({
    editor1: "",
    editor2: "",
    editor3: "",
    editor4: "",
    editor5: "",
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      setEditorOnline({
        editor1: data.meetingPage[0].section4?.content || "",
        editor2: data.meetingPage[0].section4?.form || "",
        editor3: data.meetingPage[0].section4?.date1 || "",
        editor4: data.meetingPage[0].section4?.url || "",
        editor5: data.meetingPage[0].section4?.date2 || "",
      });
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-1 flex-col justify-start w-full desktop:max-w-[976px]  px-3 desktop:px-0">
      <div className="text-16M text-primary ">
        Online Registration and Rules
      </div>
      <div className="relative w-fit">
        <div className="text-black text-48M  relative z-10">線上報名與規則</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>

      <div className="mt-[64px] text-16R text-[#252F38B2]  ">
        {editorOnline.editor1}
      </div>
      <div className="mt-[64px] flex flex-col desktop:flex-row space-x-[32px]">
        <div className="bg-white p-[32px] rounded-[24px] flex-1 desktop:min-w-0">
          <div className="text-secondary text-36R ">線上​報名表單​​</div>
          <div className="mt-[32px] max-w-[408px] h-[142px]">
            <div className="text-black text-16R ">{editorOnline.editor2}</div>
          </div>
          <div className=" mt-[32px] text-[#252F3880] text-16R ">
            最後更新時間：{editorOnline.editor4}
          </div>
        </div>
        <div className="bg-white p-[32px] rounded-[24px] flex-1 desktop:min-w-0">
          <div className="text-secondary text-36R ">
            一般與會者 <br />
            報名成功名單
          </div>
          <div className="mt-[32px] h-[90px]">
            <Link
              href={editorOnline.editor3}
              className="text-blue-500 underline text-[15px] leading-[28px] font-[500]  break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              名單詳如本附件，點此即可下載
            </Link>
          </div>
          <div className=" mt-[32px] text-[#252F3880] text-16R ">
            最後更新時間：{editorOnline.editor5}
          </div>
        </div>
      </div>
    </div>
  );
};
