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
          <div className="text-third text-16M ">Roundtable Forum​</div>
          <div className="text-black text-48M ">圓桌論壇</div>
        </div>
      </div>

      <div className="flex h-[696px]">
        <div
          className="flex justify-end items-center flex-1 pe-[128px]"
          style={{
            backgroundImage: "url('/banner/Frame 776.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="text-start w-[334px]">
            <div className="text-white text-32M ">
              師資培育教學實﻿踐計畫 圓桌論壇
            </div>
          </div>
        </div>
        <div className="bg-[#B080CA1A] flex-1 ps-[128px] flex items-center">
          <div className="text-[20px] leading-[40px] font-[400]  text-[#252F38B2] w-[610px]">
            圓桌論壇（Round Table
            Forum）是一種強調平等參與與多元視角的討論形式，所有與會者皆圍坐於同一水準，藉此共享經驗、交流意見並激盪思維。
            <br />
            本次論壇結合師資培育暨藝術教育司之「領域教材教法教學實踐研究計畫」，以及高等教育司教學實踐中「職前師資培育」計畫，邀請在教材教法與教學實踐方面具創新性的研究主持人，以及師資培育大學之相關課程教師，共同探討師資培育政策、課程教學及數位科技應用等議題。研討會也將邀請歐盟區師範學院代表透過線上方式分享不同國家師資培育制度，增進國際交流並拓展研討範疇。透過此圓桌論壇之互動與對話，期望能提供更具前瞻性的師資培育策略與教學實踐參考。
          </div>
        </div>
      </div>

      <div className="pt-[128px] pb-[160px] mx-auto">
        <Tab titles={["第一天", "第二天"]} dates={["10.18", "10.19"]} />
        <div className="flex flex-col ">
          {card.map((card, index) => (
            <SpeechCard key={index} summary />
          ))}
        </div>
      </div>
    </div>
  );
}
