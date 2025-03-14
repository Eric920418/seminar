"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Tab } from "@/components/Tab";

export const Results = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const handleTabChange = (index) => {
    setFadeIn(false);
    const timeout = setTimeout(() => setFadeIn(true), 100);
    setSelectedTab(index);
    return () => clearTimeout(timeout);
  };

  const card = [
    {
      title: "謝宜晏、﻿李姿涵​",
      content: "從認知到行動：提升台灣花蓮縣偏鄉地區居民永續生活品質之研究",
      EnContent:
        "From Perception to Action: A Study on Enhancing Sustainable Quality of Life among Rural Residents in Hualien County, Taiwan.",
    },
    {
      title: "謝宜晏、﻿李姿涵​",
      content: "從認知到行動：提升台灣花蓮縣偏鄉地區居民永續生活品質之研究",
      EnContent:
        "From Perception to Action: A Study on Enhancing Sustainable Quality of Life among Rural Residents in Hualien County, Taiwan.",
    },
    {
      title: "謝宜晏、﻿李姿涵​",
      content: "從認知到行動：提升台灣花蓮縣偏鄉地區居民永續生活品質之研究",
      EnContent:
        "From Perception to Action: A Study on Enhancing Sustainable Quality of Life among Rural Residents in Hualien County, Taiwan.",
    },
    {
      title: "謝宜晏、﻿李姿涵​",
      content: "從認知到行動：提升台灣花蓮縣偏鄉地區居民永續生活品質之研究",
      EnContent:
        "From Perception to Action: A Study on Enhancing Sustainable Quality of Life among Rural Residents in Hualien County, Taiwan.",
    },
  ];

  const card2 = [
    {
      title: "吳書如​​",
      content: "從認知到行動：提升台灣花蓮縣偏鄉地區居民永續生活品質之研究",
      EnContent:
        "From Perception to Action: A Study on Enhancing Sustainable Quality of Life among Rural Residents in Hualien County, Taiwan.",
    },
    {
      title: "吳書如​​",
      content: "從認知到行動：提升台灣花蓮縣偏鄉地區居民永續生活品質之研究",
      EnContent:
        "From Perception to Action: A Study on Enhancing Sustainable Quality of Life among Rural Residents in Hualien County, Taiwan.",
    },
    {
      title: "吳書如​​",
      content: "從認知到行動：提升台灣花蓮縣偏鄉地區居民永續生活品質之研究",
      EnContent:
        "From Perception to Action: A Study on Enhancing Sustainable Quality of Life among Rural Residents in Hualien County, Taiwan.",
    },
    {
      title: "吳書如​​",
      content: "從認知到行動：提升台灣花蓮縣偏鄉地區居民永續生活品質之研究",
      EnContent:
        "From Perception to Action: A Study on Enhancing Sustainable Quality of Life among Rural Residents in Hualien County, Taiwan.",
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-[976px]">
      <div className="text-16M text-primary">Abstract Review Results</div>
      <div className="relative">
        <div className="text-black text-48M  relative z-10">
          論文摘要審查結果公告
        </div>
        <div className="z-0 transform translate-y-[-20px]">
          <Image
            src="/標題/Rectangle 249.svg"
            alt="Rectangle"
            width={200}
            height={10}
          />
        </div>
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
          <div className="mt-[32px] grid grid-cols-3 gap-[32px]">
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
          className={`mt-[48px] w-full transition-opacity duration-500 ease-in-out ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="text-black text-32M ">口頭​論文發</div>
          <div className="mt-[8px] text-[#252F3880] text-20M ">
            Oral presentation Acceptance List
          </div>
          <div className="mt-[32px] grid grid-cols-3 gap-[32px]">
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
