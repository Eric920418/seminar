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
    if (!data) return;
    async function fetchData() {
      try {
        const res = await fetch("/api/graphql", {
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

  if (!data) return null;

  return (
    <div className="w-full desktop:w-fit max-w-full desktop:max-w-[1200px] mt-4 desktop:mt-[64px] mx-auto p-4 desktop:p-[48px] bg-white rounded-[20px] desktop:rounded-[40px] transition-all duration-500 ease-in-out">
      {/* 主要內容：左側資訊區與右側內容區 */}
      <div className="flex flex-col desktop:flex-row space-y-8 desktop:space-y-0 desktop:space-x-[64px]">
        {/* 左側時間卡區 */}
        <div className="bg-[#FFFBEE] w-full desktop:w-auto p-4 desktop:p-[24px] rounded-[16px] desktop:rounded-[24px] flex flex-col items-center max-h-[272px]">
          <div className="text-black text-2xl desktop:text-32M">
            {data.time}
          </div>
          <div className="w-[1px] h-10 desktop:h-[39px] bg-[#252F3880] my-4 desktop:my-[16px]"></div>
          <div className="text-black text-2xl desktop:text-32M">
            {data.time2}
          </div>
          <div className="bg-[#FFEFB0] p-2 desktop:p-[8px_24px_8px_24px] rounded-[8px] desktop:rounded-[16px] mt-4">
            <div className="text-black text-lg desktop:text-20M whitespace-nowrap">
              {data.week}
            </div>
          </div>
        </div>
        {/* 右側內容區 */}
        <div className="w-full desktop:max-w-[900px]">
          <div className="text-secondary text-2xl desktop:text-32M">
            {data.title}
          </div>
          <div className="mt-4 text-black text-2xl desktop:text-32M">
            {data.title2}
          </div>
          <div className="mt-2 text-black text-base desktop:text-16M">
            {data.content}
          </div>
          <div className="border my-8 desktop:my-[32px] border-[#252F381A]"></div>
          {/* 時間、地點、主持人資訊 */}
          <div className="flex flex-col desktop:flex-row space-y-4 desktop:space-y-0 desktop:space-x-[64px]">
            <div>
              <div className="text-[#252F3880] text-sm desktop:text-14R">
                時間
              </div>
              <div className="mt-2 text-secondary text-base desktop:text-16M whitespace-nowrap">
                {data.time} - {data.time2}
              </div>
            </div>
            {/* 分隔線：桌機使用垂直分隔，手機使用水平分隔 */}
            <div>
              <div className="hidden desktop:block w-[2px] h-[54px] bg-[#252F381A]"></div>
              <div className="block desktop:hidden w-full h-[1px] bg-[#252F381A]"></div>
            </div>
            <div>
              <div className="text-[#252F3880] text-sm desktop:text-14R">
                地點
              </div>
              <div className="mt-2 text-black text-base desktop:text-16M whitespace-nowrap">
                {data.location}
              </div>
            </div>
            <div>
              <div className="hidden desktop:block w-[2px] h-[54px] bg-[#252F381A]"></div>
              <div className="block desktop:hidden w-full h-[1px] bg-[#252F381A]"></div>
            </div>
            <div>
              <div className="text-[#252F3880] text-sm desktop:text-14R">
                主持人
              </div>
              <div
                className="mt-2 text-black text-base desktop:text-16M"
                dangerouslySetInnerHTML={{
                  __html: data.host.replace(/\n/g, "<br>"),
                }}
              ></div>
            </div>
          </div>
          <div className="border my-8 desktop:my-[32px] border-[#252F381A]"></div>
          <div>
            <div className="text-[#252F3880] text-sm desktop:text-14R">
              與談人
            </div>
            <div
              className="mt-2 text-black text-base desktop:text-16M"
              dangerouslySetInnerHTML={{
                __html: data.person.replace(/\n/g, "<br>"),
              }}
            ></div>
          </div>
        </div>
      </div>
      {/* 詳細內容按鈕 */}
      <div className="mt-12 desktop:mt-[48px] flex justify-center desktop:justify-start">
        <div
          className="w-fit bg-[#252F3808] p-2 desktop:p-[8px_24px_8px_24px] flex items-center space-x-2 desktop:space-x-[8px] rounded-full desktop:rounded-[40px] cursor-pointer desktop:ms-auto"
          onClick={() => setShowDetail(!showDetail)}
        >
          <div className="text-[#252F3880] text-base desktop:text-16M">
            詳細內容
          </div>
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
      {/* 詳細內容區 */}
      <div
        className="flex flex-col overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: showDetail ? `${height}px` : "0px" }}
      >
        <div>
          {data.abstract && (
            <>
              <div className="border my-8 desktop:my-[48px] border-[#252F381A]"></div>
              <div className="p-4 desktop:p-[32px]">
                <div className="text-secondary text-lg desktop:text-20M">
                  摘要​​
                </div>
                <div className="mt-8 text-black text-base desktop:text-16R">
                  {data.abstract}
                </div>
                <div className="mt-8 text-[#252F3880] text-base desktop:text-16R">
                  關鍵字：{data.keywords}
                </div>
              </div>
            </>
          )}
        </div>
        <div ref={contentRef}>
          {selectHost &&
            selectHost.map((card, i) => (
              <PeopleCard card={card} useIndex={i} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};
