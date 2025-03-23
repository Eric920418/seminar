"use client";
import { useState, useEffect } from "react";
const query = `
  query meetingPage {
    meetingPage {
      section5
    }
  }
`;

export const Transportation = () => {
  const [editorTransportation, setEditorTransportation] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      setEditorTransportation(data.meetingPage[0].section5?.location || "");
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-1 flex-col justify-start max-w-[976px]">
      <div className="text-16M text-primary ">Transportation</div>
      <div className="relative w-fit">
        <div className="text-black text-48M  relative z-10">交通</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>

      <div className="mt-[64px]">
        <div className="text-secondary text-20M ">會議預定地點</div>
        <div className="text-[#252F38B2] text-20M  mt-[24px]">
          {editorTransportation}
        </div>
      </div>
      <div className="mt-[64px]">
        <div className="text-secondary text-20M ">交通方式</div>
        <ul className=" mt-[24px] list-disc list-inside">
          <div className="flex">
            <li></li>
            <div className="text-[#252F38B2] text-16R ">
              捷運：文湖線「科技大樓站」出口行至和平東路左轉約一分鐘即可抵達。
            </div>
          </div>
          <div className="flex">
            <li></li>
            <div className="text-[#252F38B2] text-16R ">
              公車（復興南路口站下車）：237、295、紅57、復興幹線
            </div>
          </div>
          <div className="flex">
            <li></li>
            <div className="text-[#252F38B2] text-16R ">
              公車（國立臺北教育大學站下車）：18、52、72、207、211、235、278、278(區間車)、284、568、662、663、680、685、688、和平幹線
            </div>
          </div>
          <div className="flex">
            <li></li>
            <div className="text-[#252F38B2] text-16R ">
              U-bike：捷運站出口左方麥當勞旁可供U-bike
            </div>
          </div>
        </ul>
      </div>
      <div className="mt-[64px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.2771475927175!2d121.54220407537628!3d25.024666977822424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a908a8232611%3A0xeebfb2d71a5025c7!2z5ZyL56uL6Ie65YyX5pWZ6IKy5aSn5a24!5e0!3m2!1szh-TW!2stw!4v1742190715283!5m2!1szh-TW!2stw"
          width="976"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};
