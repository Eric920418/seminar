"use client";
import { useState, useEffect, useRef } from "react";
import { Tab } from "@/components/Tab";

const query = `
  query meetingPage {
    meetingPage {
      section1
    }
  }
`;

export const Agenda = () => {
  const [useData, setUseData] = useState<any>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      setUseData(data.meetingPage[0].section1.list);
    }
    fetchData();
  }, []);

  const handleTabChange = (index) => {
    setFadeIn(false);
    const timeout = setTimeout(() => setFadeIn(true), 100);
    setSelectedTab(index);
    return () => clearTimeout(timeout);
  };

  const dates = useData.map((card) => card.date);
  const titles = dates.map((_, index) => `第${index + 1}天`);
  return (
    <div className="flex flex-1 flex-col justify-start max-w-[976px]">
      <div className="text-16M text-primary ">Agenda</div>
      <div className="relative w-fit">
        <div className="text-black text-48M  relative z-10">會議議程</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>

      <div className="mt-[64px] me-auto">
        <Tab titles={titles} dates={dates} onChange={handleTabChange} />
      </div>
      <div
        className={`mt-[32px] transition-opacity duration-500 ease-in-out ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
      >
        {useData && useData.length > 0 ? (
          <div className=" w-[976px] h-[1157px]">
            <span
              dangerouslySetInnerHTML={{
                __html: useData[selectedTab].content,
              }}
            />
          </div>
        ) : (
          <div className="bg-white w-[976px] h-[1157px]"></div>
        )}
      </div>
    </div>
  );
};
