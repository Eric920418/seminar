import { Tab } from "@/components/Tab";
import { SpeechCard } from "@/components/Speech/SpeechCard";

export const Excellence = () => {
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
