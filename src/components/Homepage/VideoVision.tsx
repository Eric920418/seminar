import { Button } from "@/components/Button";

export const VideoVision = () => {
  return (
    <div className="w-full  pt-[128px] pb-[160px]">
      <div className="w-[1312px] mx-auto flex items-center space-x-[64px]">
        <div className="w-[608px] flex flex-col items-start">
          <div className="text-16M text-primary ">video</div>
          <div className="relative w-fit">
            <div className="text-black text-48M  relative z-10">會後影片</div>
            <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
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
