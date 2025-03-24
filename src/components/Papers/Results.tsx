"use client";
import { useState, useEffect } from "react";
import { Tab } from "@/components/Tab";

const query = `
  query paperPage {
    paperPage {
      section1
    }
  }
`;

export const Results = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [card, setCard] = useState([]);
  const [card2, setCard2] = useState([]);

  const handleTabChange = (index) => {
    setFadeIn(false);
    const timeout = setTimeout(() => setFadeIn(true), 100);
    setSelectedTab(index);
    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      setCard(data.paperPage[0].section1.tab[0].card);
      setCard2(data.paperPage[0].section1.tab[1].card);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-[976px]  px-3 desktop:px-0">
      <div className="text-16M text-primary">Abstract Review Results</div>
      <div className="relative w-fit">
        <div className="text-black text-36M desktop:text-48M  relative z-10">
          論文摘要審查結果公告
        </div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>

      <div className="mt-[64px] me-auto">
        <Tab
          titles={["口頭​論文", "海報論文​"]}
          color="text-[#DD6B00] border-b-6 border-[#DD6B00]"
          onChange={handleTabChange}
        />
      </div>

      {selectedTab === 0 ? (
        <div
          key={selectedTab} // 透過 key 強制重新 mount
          className={`mt-[48px] w-full transition-opacity duration-500 ease-in-out ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-black text-32M ">口頭​論文發表錄取</div>
          <div className="mt-[8px] text-[#252F3880] text-20M ">
            Oral presentation Acceptance List
          </div>
          <div className="mt-[32px] grid desktop:grid-cols-3 gap-[32px]">
            {card.map((item, index) => (
              <div key={index} className="rounded-[24px] p-[32px] bg-white">
                <div className="text-secondary text-20M ">{item.title}</div>
                <div className="mt-[24px]">
                  <div className="text-black text-16R ">{item.content}</div>
                  <div className="mt-[8px] text-black text-16R ">
                    {item.EnContent}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          key={selectedTab}
          className={`mt-[48px] w-full transition-opacity duration-500 ease-in-out  ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-black text-32M ">口頭​論文發</div>
          <div className="mt-[8px] text-[#252F3880] text-20M ">
            Oral presentation Acceptance List
          </div>
          <div className="mt-[32px] grid desktop:grid-cols-3 gap-[32px]">
            {card2.map((item, index) => (
              <div key={index} className="rounded-[24px] p-[32px] bg-white">
                <div className="text-secondary text-20M ">{item.title}</div>
                <div className="mt-[24px]">
                  <div className="text-black text-16R ">{item.content}</div>
                  <div className="mt-[8px] text-black text-16R ">
                    {item.EnContent}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
