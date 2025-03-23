"use client";
import { useState, useRef, useEffect } from "react";
import { PeopleCard } from "@/components/Speech/PeopleCard";
import Image from "next/image";

const query2 = `
  query host {
    host {
      section1
    }
  }
`;

export const SpeechCard = ({ data }) => {
  if (!data) return null;
  const [showDetail, setShowDetail] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [selectHost, setSelectHost] = useState([]);
  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [showDetail]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: query2,
          }),
        });
        const useData = await res.json();

        const matchedCards = useData.data.host[0].section1.editorCards.filter(
          (editor) => data.people.includes(editor.name)
        );

        setSelectHost(matchedCards);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    }
    fetchData();
  }, [data]);

  return (
    <div className="max-w-[1200px] mt-[64px] w-fit h-fit mx-auto p-[48px] bg-white rounded-[40px] transition-all duration-500 ease-in-out">
      <div className="flex space-x-[64px]">
        <div className="bg-[#FFFBEE] p-[24px] rounded-[24px] flex flex-col items-center max-h-[272px]">
          <div className="text-black text-32M ">{data.time}</div>
          <div className="w-[1px] h-[39px] bg-[#252F3880] my-[16px]"></div>
          <div className="text-black text-32M ">{data.time2}</div>
          <div className="bg-[#FFEFB0] p-[8px_24px_8px_24px] rounded-[16px] mt-[24px]">
            <div className="text-black text-20M text-nowrap">{data.week}</div>
          </div>
        </div>
        <div className="max-w-[900px] w-fit">
          <div className="text-secondary text-32M ">{data.title}​</div>
          <div className="mt-[16px] text-black text-32M ">{data.title2}</div>
          <div className="mt-[8px] text-black text-16M">{data.content}</div>
          <div className="border my-[32px] border-[#252F381A]"></div>
          <div className="flex space-x-[64px]">
            <div>
              <div className="text-[#252F3880] text-14R ">時間</div>
              <div className="mt-[8px] text-secondary text-16M text-nowrap">
                {data.time} - {data.time2}
              </div>
            </div>
            <div className="w-[2px] h-[54px] bg-[#252F381A]"></div>
            <div>
              <div className="text-[#252F3880] text-14R ">地點</div>
              <div className="mt-[8px] text-black text-16M text-nowrap">
                {data.location}
              </div>
            </div>
            <div className="w-[2px] h-[54px] bg-[#252F381A]"></div>
            <div>
              <div className="text-[#252F3880] text-14R ">主持人</div>
              <div
                className="mt-[8px] text-black text-16M "
                dangerouslySetInnerHTML={{
                  __html: data.host.replace(/\n/g, "<br>"),
                }}
              ></div>
            </div>
          </div>
          <div className="border my-[32px] border-[#252F381A]"></div>
          <div>
            <div className="text-[#252F3880] text-14R ">與談人</div>
            <div
              className="mt-[8px] text-black text-16M "
              dangerouslySetInnerHTML={{
                __html: data.person.replace(/\n/g, "<br>"),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="mt-[48px]">
        <div
          className="w-fit bg-[#252F3808] p-[8px_24px_8px_24px] flex items-center space-x-[8px] rounded-[40px] ms-auto cursor-pointer"
          onClick={() => setShowDetail(!showDetail)}
        >
          <div className="text-[#252F3880] text-16M ">詳細內容</div>
          <div>
            <Image
              src={
                showDetail
                  ? "/icons/24icon/horizontal_rule.svg"
                  : "/icons/24icon/add.svg"
              }
              alt="horizontal"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
      <div
        className="flex flex-col  overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: showDetail ? `${height}px` : "0px" }}
      >
        <div>
          {data.abstract && (
            <>
              <div className="border my-[48px] border-[#252F381A]"></div>
              <div className="p-[32px]">
                <div className="text-secondary text-20M">摘要​​</div>
                <div className="mt-[32px] text-black text-16R">
                  {data.abstract}
                </div>
                <div className="mt-[32px] text-[#252F3880] text-16R">
                  關鍵字：{data.keywords}
                </div>
              </div>
            </>
          )}
        </div>
        <div ref={contentRef}>
          {selectHost &&
            selectHost.map((card, i) => <PeopleCard card={card} key={i} />)}
        </div>
      </div>
    </div>
  );
};
