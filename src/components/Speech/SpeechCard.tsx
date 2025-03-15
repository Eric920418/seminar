"use client";
import { useState, useRef, useEffect } from "react";
import { PeopleCard } from "@/components/Speech/PeopleCard";
import Image from "next/image";
export const SpeechCard = ({ summary }) => {
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
    <div className="max-w-[1200px] mt-[64px] w-fit h-fit mx-auto p-[48px] bg-white rounded-[40px] transition-all duration-500 ease-in-out">
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
        <div>
          {summary && (
            <>
              <div className="border my-[48px] border-[#252F381A]"></div>
              <div className="p-[32px]">
                <div className="text-secondary text-20M">摘要​​</div>
                <div className="mt-[32px] text-black text-16R">
                  近年來，翻轉教學與大型線上公開課程（MOOCs）等多元模式的興起，使大專課堂面貌漸有轉變。然而，就外語教學而言，教師常受教學進度與檢定考試限制，只能依循進度教授字彙、文法、句型，難以真正翻轉。學習者亦因備考壓力而忽略思考外語學習意義。
                  本研究以應用日語系高年級翻譯課程為對象，嘗試運用翻轉教學改變傳統翻譯課堂。首先，要求學生走出教室，從嘉義市街頭餐廳招牌或菜單中蒐集錯誤日文譯文作為翻譯素材；再結合研究者執行的農委會農糧署「農民實踐示範計畫」，協助嘉義老街冰品店完成芒果冰菜單之日譯稿。
                  <br />
                  教學設計上，採用合作式翻譯教學與小組合作評量，彌補傳統翻譯教學的不足。同時，透過同儕討論、問題解決及自主學習，培養學生團隊精神並完成翻譯任務。由於成果能立即運用於真實情境，學生在每次翻譯時均更謹慎，也得以更深入體驗翻譯實務的需求與價值。
                </div>
                <div className="mt-[32px] text-[#252F3880] text-16R">
                  關鍵字：​教學實踐、中日翻譯、課程設計
                </div>
              </div>
            </>
          )}
        </div>
        <div ref={contentRef}>
          {people.map((_, i) => (
            <PeopleCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};
