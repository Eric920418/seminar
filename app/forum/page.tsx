"use client";
import { useState, useEffect } from "react";
import { SpeechCard } from "@/components/Speech/SpeechCard";
import { Tab } from "@/components/Tab";

const query = `
  query forumPage {
    forumPage {
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
  type CardType = {
    id: string;
    date: string;
  };

  interface EditorType {
    dateLabel1: string;
    dateLabel2: string;
  }
  const [editor, setEditor] = useState<EditorType | null>(null);
  const [useData, setUseData] = useState<CardType[]>([]);
  const [event, setEvent] = useState([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      setEditor(data.forumPage[0].section1);
      setUseData(data.forumPage[0].section2.card);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchEventData() {
      try {
        const res = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: query2 }),
        });
        const { data } = await res.json();
        const filteredEvent = data.event[0].section1.editorCards.filter(
          (card: CardType) => {
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

  const handleTabChange = (index: number) => {
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
          <div className="text-third text-16M ">Roundtable Forum​</div>
          <div className="text-black text-48M ">圓桌論壇</div>
        </div>
      </div>

      <div className="flex flex-col desktop:flex-row h-[696px]">
        <div
          className="flex desktop:justify-end items-center flex-1 desktop:pe-[128px] px-3 desktop:px-0"
          style={{
            backgroundImage: "url('/banner/Frame 776.png')",
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
        <div className="bg-[#B080CA1A] flex-1 desktop:ps-[128px] flex items-center px-3 desktop:px-0">
          {editor && (
            <div className="text-[12px] leading-[30px] desktop:text-[20px] desktop:leading-[40px] font-[400]  text-[#252F38B2] w-[610px]">
              {editor.dateLabel2}
            </div>
          )}
        </div>
      </div>

      <div className="pt-[128px] pb-[160px] mx-auto  px-3 desktop:px-0">
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
