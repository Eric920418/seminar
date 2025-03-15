import { Button } from "@/components/Button"; // 使用 alias

export const MainVision = () => {
  return (
    <div
      className="h-screen w-screen"
      style={{
        backgroundImage: "url('/banner/icte_banner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className=" h-full flex justify-center flex-col mx-[6%]">
        <div className="flex">
          <div className="text-[#009982] text-[160px] font-[700] leading-[142%] tracking-[4%] font-title">
            2025&nbsp;
          </div>
          <div className="text-[#FFFFFF] text-[160px] font-[700] leading-[142%] tracking-[4%] font-title">
            ICTE
          </div>
        </div>
        <div className="text-black text-[48px] leading-[144%]  mt-[-14px]">
          第十三屆師資培育國過學術研討會： <br />
          面對不確定未來的師資培育韌性
        </div>
        <div className="mt-[18px] flex items-center">
          <div className="text-black text-[64px] font-[700] leading-[142%] font-title">
            10.17
          </div>
          <div className="text-black text-[24px] leading-[142%] font-title mt-[31px] ms-[3px]">
            FRI
          </div>
          <div className="border-1 w-[96px] flex items-center justify-center  mx-[12px]"></div>
          <div className="text-black text-[64px] font-[700] leading-[142%] font-title">
            18
          </div>
          <div className="text-black text-[24px] leading-[142%] font-title mt-[31px] ms-[6px]">
            SAT
          </div>
        </div>
        <div className="text-black text-[24px] font-[500] leading-none  ">
          國立台北教育大學 至善樓國際會議廳
        </div>
        <div className="mt-[72px]">
          <Button
            text="會議議程"
            textSize="text-20M"
            textColor="text-white"
            bgColor="bg-black"
            padding="p-[24px_32px_24px_32px]"
            src="/button/arrow_right_2.svg"
          ></Button>
        </div>
      </div>
    </div>
  );
};
