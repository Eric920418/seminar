import Image from "next/Image";
import { PeopleCard } from "@/components/Speech/PeopleCard";

export const Oral = () => {
  const card = [
    { title: "場次一", content: "師培區域網絡建置與協作" },
    { title: "場次一", content: "師培區域網絡建置與協作" },
    { title: "場次一", content: "師培區域網絡建置與協作" },
    { title: "場次一", content: "師培區域網絡建置與協作" },
    { title: "場次一", content: "師培區域網絡建置與協作" },
    { title: "場次一", content: "師培區域網絡建置與協作" },
  ];

  return (
    <div className="flex flex-1 flex-col justify-start max-w-[976px]">
      <div className="text-16M text-primary ">Oral Presentation Sessions</div>
      <div className="relative">
        <div className="text-black text-48M relative z-10">口頭發表場次</div>
        <div className="z-0 transform translate-y-[-20px]">
          <Image
            src="/標題/Rectangle 249.svg"
            alt="Rectangle"
            width={200}
            height={28}
          />
        </div>
      </div>
      <div className="mt-[64px] grid grid-cols-4 gap-[32px]">
        {card.map((item, index) => (
          <div
            key={index}
            className="p-[24px] rounded-[24px] bg-[#F4F7FD] w-[220px]"
          >
            <div className="text-[#252F38B2] text-16M ">{item.title}</div>
            <div className="mt-[8px] text-[#252F38B2] text-16M">
              {item.content}
            </div>
          </div>
        ))}
      </div>
      <PeopleCard />
      <div className="mt-[64px]"></div>
    </div>
  );
};
