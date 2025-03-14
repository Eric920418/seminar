import Image from "next/image";
import { Button } from "@/components/Button";

export const ConferenceVision = () => {
  return (
    <div className="w-full  pt-[128px] pb-[160px]">
      <div className="w-[1312px] mx-auto flex items-center space-x-[64px]">
        <div className="w-[608px] flex flex-col items-start">
          <div className="text-16M text-primary ">conference manual</div>
          <div className="relative">
            <div className="text-black text-48M  relative z-10">
              會議​​手冊下載
            </div>
            <div className="z-0 transform translate-y-[-20px]">
              <Image
                src="/標題/Rectangle 249.svg"
                alt="Rectangle"
                width={200}
                height={28}
              />
            </div>
            <div className="text-black text-20R  mt-[64px]">
              彩色完整版會議手冊版可以點此下載PDF。
            </div>
          </div>
        </div>
        <div className="bg-[#F0F3F8] rounded-[40px] py-[64px]">
          <div className="w-[258px] h-[365px] bg-black mx-[191px]"></div>
          <div className="mt-[32px] mx-auto w-fit">
            <Button
              text="手冊下載"
              textColor="text-[#252F38B2]"
              textSize="text-16M"
              bgColor="bg-white"
              padding="p-[16px_24px_16px_24px]"
              src="/icons/24icon/download.svg"
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};
