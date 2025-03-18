import { Button } from "@/components/Button";

export const ConferenceVision = () => {
  return (
    <div className="w-full  pt-[128px] pb-[160px]">
      <div className="w-full justify-center flex-row laptop:flex items-center space-x-[64px]">
        <div className="desktop:w-[608px] flex flex-col items-start">
          <div className="text-16M text-primary ">conference manual</div>
          <div className="relative w-fit">
            <div className="text-black text-48M  relative z-10">
              會議​​手冊下載
            </div>
            <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
          </div>
        </div>
        <div className="bg-[#F0F3F8] rounded-[40px] py-[64px]">
          <div className=" desktop:w-[258px] h-[365px] bg-black  desktop:mx-[191px]"></div>
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
