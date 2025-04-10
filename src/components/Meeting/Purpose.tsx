"use client";
import { useState, useEffect } from "react";

const query = `
  query meetingPage {
    meetingPage {
      section7
    }
  }
`;
export const Purpose = () => {
  const [useData, setUseData] = useState("");
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      setUseData(data.meetingPage[0].section7.content2);
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-1 flex-col justify-start w-full desktop:max-w-[976px]  ">
      <div className="text-16M text-primary px-3 desktop:px-0">Purpose</div>
      <div className="relative w-fit px-3 desktop:px-0">
        <div className="text-black text-48M  relative z-10 ">目的</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>
      <div className="w-screen desktop:w-[976px] h-auto px-3 desktop:px-0">
        <span dangerouslySetInnerHTML={{ __html: useData }} />
      </div>
    </div>
  );
};
