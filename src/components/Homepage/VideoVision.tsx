import Image from "next/image";
import { Button } from "@/components/Button";

export const VideoVision = () => {
  return (
    <div className="w-full  pt-[128px] pb-[160px]">
      <div className="w-[1312px] mx-auto flex items-center space-x-[64px]">
        <div className="w-[608px] flex flex-col items-start">
          <div className="text-16M text-primary ">video</div>
          <div className="relative">
            <div className="text-black text-48M  relative z-10">​會後影片​</div>
            <div className="z-0 transform translate-y-[-20px]">
              <Image
                src="/標題/Rectangle 249.svg"
                alt="Rectangle"
                width={200}
                height={28}
              />
            </div>
            <div className="text-black text-20R  mt-[64px] max-w-[527px]">
              促進學術與實務交流，提供跨領域學習平台，支持師資培育發展，並協助大學與各教育階段融合創新教學實務
            </div>
            <div className="mt-[64px] ">
              <Button
                text="更多​會議直播回放"
                textSize="text-20M"
                textColor="text-white"
                bgColor="bg-third"
                padding="p-[24px_32px_24px_32px]"
                src="/button/arrow_right_2.svg"
              ></Button>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-black rounded-[40px] w-[640px] h-[360px]"></div>
          <div className="mt-[16px] ">
            <div className="w-fit ms-auto px-[24px]">
              <div className="text-secondary text-20M  ">2025</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
