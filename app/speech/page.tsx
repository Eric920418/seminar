import { Card } from "@/components/Speech/Card";
import { Tab } from "@/components/Tab";
import Image from "next/image";

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
          <div className="text-third text-16M ">Keynote Speech​</div>
          <div className="text-black text-48M ">主​題演講</div>
        </div>
      </div>

      <div className="flex h-[496px]">
        <div
          className="flex justify-end items-center flex-1 pe-[128px]"
          style={{
            backgroundImage: "url('/banner/Frame 775.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="text-start w-[334px]">
            <div className="text-white text-32M ">
              教材教法創新與師資培育交流論壇
            </div>
          </div>
        </div>
        <div className="bg-[#B080CA1A] flex-1 ps-[128px] flex items-center">
          <div className="text-[20px] leading-[40px] font-[400]  text-[#252F38B2] w-[610px]">
            預定邀請國內外對教材教法素有專精之學者數名，除了探討不同國家
            之師資培育制度特色、重要政策以及當前整體師資培育所面臨的挑戰
            等面向，同時探討應用於各領域之 PBL、現象本位、AI 教育及跨領域
            教學學習等創新教學方法，進而瞭解當前國際趨勢下的師資培育變革
            趨勢，以及教材教法創新與實踐，促進學術交流與師資培育合作。
          </div>
        </div>
      </div>

      <div className="pt-[128px] pb-[160px] mx-auto">
        <Tab titles={["第一天", "第二天"]} dates={["10.18", "10.19"]} />
        <div className="flex flex-col ">
          {card.map((card, index) => (
            <Card key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
