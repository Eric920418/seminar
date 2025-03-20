"use client";
import { useState, useEffect, useRef } from "react";
import { Tab } from "@/components/Tab";
import { SpeechCard } from "@/components/Speech/SpeechCard";

const query = `
  query exhibitionPage {
    exhibitionPage {
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

export const Excellence = () => {
  const [useData, setUseData] = useState<any>([]);
  const [event, setEvent] = useState<any>([]);
  const hasFetchedRef = useRef(false);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      setUseData(data.exhibitionPage[0].section2.card);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (hasFetchedRef.current) return; // 若已經執行過則跳出
      hasFetchedRef.current = true;
      try {
        const res = await fetch("http://localhost:3000/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: query2 }),
        });
        const { data } = await res.json();
        data.event[0].section1.editorCards.forEach((card: any) => {
          // 這裡可以遍歷 useData 陣列，看是否有任一元素符合條件
          if (
            Array.isArray(useData) &&
            useData.some((item) => item.date === card.date)
          ) {
            setEvent((prevEvent) => [...prevEvent, card]);
          }
        });
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    }
    // 當 useData 陣列有資料時才執行 fetchData
    if (Array.isArray(useData) && useData.length > 0) {
      fetchData();
    }
  }, [useData]);


  目前撈完資料 明天選染

  return (
    <div className="flex flex-1 flex-col justify-start max-w-[976px]">
      <div className="text-16M text-primary ">Agenda</div>
      <div className="relative w-fit">
        <div className="text-black text-48M  relative z-10">會議議程</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>

      <div className="mt-[64px] me-auto">
        <Tab titles={["第一天", "第二天"]} dates={["10.18", "10.19"]} />
      </div>
      <div>
        <SpeechCard />
      </div>
    </div>
  );
};
