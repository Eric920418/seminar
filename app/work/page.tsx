"use client";
import { useState, useEffect, useRef } from "react";
import { Tab } from "@/components/Tab";
import { SpeechCard } from "@/components/Speech/SpeechCard";

const query = `
  query workShopPage {
    workShopPage {
      section1
      section2
    }
  }
`;

const query2 = `
  query event {
    event {
      section1
    }
  }
`;

export default function Page() {
  const [editor, setEditor] = useState<any>(null);
  const [useData, setUseData] = useState<any>([]);
  const [event, setEvent] = useState<any>([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const hasFetchedRef = useRef(false);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      setEditor(data.workShopPage[0].section1);
      setUseData(data.workShopPage[0].section2.card);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchEventData() {
      try {
        const res = await fetch("http://localhost:3000/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: query2 }),
        });
        const { data } = await res.json();
        const filteredEvent = data.event[0].section1.editorCards.filter(
          (card) => {
            return (
              useData[selectedTab] && useData[selectedTab].id.includes(card.id)
            );
          }
        );
        setEvent(filteredEvent);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    }
    // 當 useData 有資料且 selectedTab 有定義時執行
    if (Array.isArray(useData) && useData.length > 0) {
      fetchEventData();
    }
  }, [useData, selectedTab]);

  const handleTabChange = (index) => {
    setFadeIn(false);
    const timeout = setTimeout(() => setFadeIn(true), 100);
    setSelectedTab(index);
    return () => clearTimeout(timeout);
  };

  const dates = useData.map((card) => card.date);
  const titles = dates.map((_, index) => `第${index + 1}天`);

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
          <div className="text-third text-16M ">Workshop​​​</div>
          <div className="text-black text-48M ">工作坊​​</div>
        </div>
      </div>

      <div className="flex h-[696px]">
        <div
          className="flex justify-end items-center flex-1 pe-[128px]"
          style={{
            backgroundImage: "url('/banner/Frame 777.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="text-start w-[334px]">
            {editor && (
              <div className="text-white text-32M ">{editor.dateLabel1}</div>
            )}
          </div>
        </div>
        <div className="bg-[#B080CA1A] flex-1 ps-[128px] flex items-center">
          {editor && (
            <div className="text-[20px] leading-[40px] font-[400]  text-[#252F38B2] w-[610px]">
              {editor.dateLabel2}
            </div>
          )}
        </div>
      </div>

      <div className="pt-[128px] pb-[160px] mx-auto">
        <Tab titles={titles} dates={dates} onChange={handleTabChange} />
        <div
          className={`flex flex-col transition-opacity duration-500 ease-in-out ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          {event && event.length > 0 ? (
            <>
              {event.map((event, index) => (
                <SpeechCard data={event} key={index} />
              ))}
            </>
          ) : (
            <div className="bg-white w-[976px] h-[1157px]"></div>
          )}
        </div>
      </div>
    </div>
  );
}
