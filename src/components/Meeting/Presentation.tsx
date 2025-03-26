"use client";
import { useState, useEffect } from "react";
const query = `
  query meetingPage {
    meetingPage {
      section3
    }
  }
`;

export const Presentation = () => {
  const [editorRule, setEditorRule] = useState({
    editor1: "",
    editor2: "",
    editor3: "",
    editor4: "",
    editor5: "",
    editor6: "",
    editor7: "",
    editor8: "",
    editor9: "",
    editor10: "",
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      setEditorRule({
        editor1: data.meetingPage[0].section3?.content1 || "",
        editor2: data.meetingPage[0].section3?.time1 || "",
        editor3: data.meetingPage[0].section3?.content2 || "",
        editor4: data.meetingPage[0].section3?.time2 || "",
        editor5: data.meetingPage[0].section3?.content3 || "",
        editor6: data.meetingPage[0].section3?.time3 || "",
        editor7: data.meetingPage[0].section3?.content4 || "",
        editor8: data.meetingPage[0].section3?.time4 || "",
        editor9: data.meetingPage[0].section3?.content5 || "",
        editor10: data.meetingPage[0].section3?.time5 || "",
      });
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-1 flex-col justify-start  px-3 desktop:px-0">
      <div className="text-16M text-primary ">Presentation Guidelines</div>
      <div className="relative w-fit">
        <div className="text-black text-48M  relative z-10">​發表規則</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>
      <div className="desktop:w-[976px] ">
        <div className="mt-[64px] flex space-x-1 desktop:space-x-[32px] ">
          <div className="bg-white p-3 desktop:p-[32px] rounded-[24px] flex-1 min-w-0">
            <div className="text-secondary text-[15px] desktop:text-20M ">
              圓桌論﻿壇
            </div>
            <div className="mt-[24px] text-black text-[10px] desktop:text-[15px] leading-[28px] font-[500] ">
              {editorRule.editor1}
            </div>
            <div
              className=" mt-[16px] text-black text-[10px] desktop:text-[15px] leading-[28px] font-[400]"
              dangerouslySetInnerHTML={{
                __html: editorRule.editor2.replace(/\n/g, "<br>"),
              }}
            ></div>
          </div>
          <div className="bg-white p-3 desktop:p-[32px] rounded-[24px] flex-1 min-w-0 ">
            <div className="text-secondary text-[15px] desktop:text-20M">
              國外學者專題演講
            </div>
            <div className="mt-[24px] text-black text-[10px] desktop:text-[15px] leading-[28px] font-[500] ">
              {editorRule.editor3}
            </div>
            <div
              className=" mt-[16px] text-black text-[10px] desktop:text-[15px] leading-[28px] font-[400] "
              dangerouslySetInnerHTML={{
                __html: editorRule.editor4.replace(/\n/g, "<br>"),
              }}
            ></div>
          </div>
        </div>
        <div className="mt-[16px] desktop:mt-[32px] ">
          <div className="bg-white p-3 desktop:p-[32px] rounded-[24px] flex-1 min-w-0">
            <div className="text-secondary text-[15px] desktop:text-20M ">
              論文發表
            </div>
            <div className="mt-[24px] text-black text-[10px] desktop:text-[15px] leading-[28px] font-[500] ">
              {editorRule.editor5}
            </div>
            <div
              className=" mt-[16px] text-black text-[10px] desktop:text-[15px] leading-[28px] font-[400] "
              dangerouslySetInnerHTML={{
                __html: editorRule.editor6.replace(/\n/g, "<br>"),
              }}
            ></div>
          </div>
        </div>
        <div className="mt-[16px] desktop:mt-[32px] flex space-x-1 desktop:space-x-[32px] ">
          <div className="bg-white p-3 desktop:p-[32px] rounded-[24px] flex-1 min-w-0">
            <div className="text-secondary text-[15px] desktop:text-20M">
              工作坊
            </div>
            <div className="mt-[24px] text-black text-[10px] desktop:text-[15px] leading-[28px] font-[500] ">
              {editorRule.editor7}
            </div>
            <div
              className=" mt-[16px] text-black text-[10px] desktop:text-[15px] leading-[28px] font-[400] "
              dangerouslySetInnerHTML={{
                __html: editorRule.editor8.replace(/\n/g, "<br>"),
              }}
            ></div>
          </div>
          <div className="bg-white p-3 desktop:p-[32px] rounded-[24px] flex-1 min-w-0">
            <div className="text-secondary text-[15px] desktop:text-20M">
              Excell﻿ence in Teaching Talk（EIT Talk）
            </div>
            <div className="mt-[24px] text-black text-[10px] desktop:text-[15px] leading-[28px] font-[500] ">
              {editorRule.editor9}
            </div>
            <div
              className=" mt-[16px] text-black text-[10px] desktop:text-[15px] leading-[28px] font-[400] "
              dangerouslySetInnerHTML={{
                __html: editorRule.editor10.replace(/\n/g, "<br>"),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
