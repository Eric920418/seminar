"use client";
import { useState, useRef, useEffect } from "react";
import { PeopleCard } from "@/components/Speech/PeopleCard";
import Image from "next/image";
export const Card = () => {
  const people = [{ name: "ee" }, { name: "ee" }, { name: "ee" }];
  const [showDetail, setShowDetail] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [showDetail]);
  return (
    <div className="mt-[64px] w-fit h-fit mx-auto p-[48px] bg-white rounded-[40px] transition-all duration-500 ease-in-out">
      <div className="flex space-x-[64px]">
        <div className="bg-[#FFFBEE] p-[24px] rounded-[24px] flex flex-col items-center max-h-[272px]">
          <div className="text-black text-32M font-NotoSansTC">11:45</div>
          <div className="w-[1px] h-[39px] bg-[#252F3880] my-[16px]"></div>
          <div className="text-black text-32M font-NotoSansTC">12:45</div>
          <div className="bg-[#FFEFB0] p-[8px_24px_8px_24px] rounded-[16px] mt-[24px]">
            <div className="text-black text-20M font-NotoSansTC">星期五​</div>
          </div>
        </div>
        <div className="max-w-[881px] w-fit">
          <div className="text-secondary text-32M font-NotoSansTC">
            Keynote Speech I​
          </div>
          <div className="mt-[16px] text-black text-32M font-NotoSansTC">
            探討多元性別概念，擴展編審視野與深化知能～2024年審定本教科用書第4次專題研習
          </div>
          <div className="border my-[32px] border-[#252F381A]"></div>
          <div className="flex space-x-[64px]">
            <div>
              <div className="text-[#252F3880] text-14R font-NotoSansTC">
                時間
              </div>
              <div className="mt-[8px] text-secondary text-16M font-NotoSansTC">
                11:45 - 12:45
              </div>
            </div>
            <div className="w-[2px] h-[54px] bg-[#252F381A]"></div>
            <div>
              <div className="text-[#252F3880] text-14R font-NotoSansTC">
                地點
              </div>
              <div className="mt-[8px] text-black text-16M font-NotoSansTC">
                主題廣場
              </div>
            </div>
            <div className="w-[2px] h-[54px] bg-[#252F381A]"></div>
            <div>
              <div className="text-[#252F3880] text-14R font-NotoSansTC">
                主持人
              </div>
              <div className="mt-[8px] text-black text-16M font-NotoSansTC">
                李慧嬌 副教授 國立新竹教育大學 教育評量與課程設計系
              </div>
            </div>
          </div>
          <div className="border my-[32px] border-[#252F381A]"></div>
          <div>
            <div className="text-[#252F3880] text-14R font-NotoSansTC">
              與談人
            </div>
            <div className="mt-[8px] text-black text-16M font-NotoSansTC">
              王大昌 助理研究員 國立中央大學 教師專業發展研究中心
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[48px]">
        <div
          className="w-fit bg-[#252F3808] p-[8px_24px_8px_24px] flex items-center space-x-[8px] rounded-[40px] ms-auto cursor-pointer"
          onClick={() => setShowDetail(!showDetail)}
        >
          <div className="text-[#252F3880] text-16M font-NotoSansTC">
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
      <div
        className="flex flex-col  overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: showDetail ? `${height}px` : "0px" }}
      >
        <div ref={contentRef}>
          {people.map((_, i) => (
            <PeopleCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
