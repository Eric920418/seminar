import { SpeechCard } from "@/components/Speech/SpeechCard";
import { Tab } from "@/components/Tab";

export default function Page() {
  const card = [
    {
      title: "Keynote Speech I",
      content:
        "探討多元性別概念，擴展編審視野與深化知能～2024年審定本教科用書第4次專題研習",
    },
    {
      title: "Keynote Speech II",
      content:
        "探討多元性別概念，擴展編審視野與深化知能～2024年審定本教科用書第4次專題研習",
    },
  ];

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
            <div className="text-white text-32M ">
              素養導向﻿教學方法創新應用嘉年華
            </div>
          </div>
        </div>
        <div className="bg-[#B080CA1A] flex-1 ps-[128px] flex items-center">
          <div className="text-[20px] leading-[40px] font-[400]  text-[#252F38B2] w-[610px]">
            整合現場教學專家教師、國內知名創新教育或具備實務經驗之講師、
            師培大學相關科系，以及各大領域教學研究中心等師資培育課程教學
            投入者，針對未來教師教學所需之跨領域素養導向課程發展、教學設
            計與學習評量等知能(例如概念為本教學、現象本位教學、DFC 教學、
            AI-pedagogy、數位平臺應用與多元評量、探究與實作......)，分別提
            供不同角度提出創新教學理念與實作之分享嘉年華，期能更強化教材
            教法研究與教學之影響與效益。另外，也預計邀請師資培育教學實踐
            相關優良計畫之授課教師及師資生，分享其教學理念設計以及師資生
            學習參與，或安排場次邀請師資生發表參與師資培育課程或教育實踐
            研究之經驗反思。
          </div>
        </div>
      </div>

      <div className="pt-[128px] pb-[160px] mx-auto">
        <Tab titles={["第一天", "第二天"]} dates={["10.18", "10.19"]} />
        <div className="flex flex-col ">
          {card.map((card, index) => (
            <SpeechCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
