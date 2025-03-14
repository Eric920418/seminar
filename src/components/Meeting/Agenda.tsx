import Image from "next/Image";
import { Tab } from "@/components/Tab";
export const Agenda = () => {
  return (
    <div className="flex flex-1 flex-col justify-start max-w-[976px]">
      <div className="text-16M text-primary ">Agenda</div>
      <div className="relative">
        <div className="text-black text-48M relative z-10">會議議程</div>
        <div className="z-0 transform translate-y-[-20px]">
          <Image
            src="/標題/Rectangle 249.svg"
            alt="Rectangle"
            width={200}
            height={28}
          />
        </div>
      </div>
      <div className="mt-[64px] me-auto">
        <Tab titles={["第一天", "第二天"]} dates={["10.18", "10.19"]} />
      </div>
      <div className="mt-[32px]">
        <div className="bg-white w-[976px] h-[1157px]"></div>
      </div>
    </div>
  );
};
