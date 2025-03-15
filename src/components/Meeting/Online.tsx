import Link from "next/link";
export const Online = () => {
  return (
    <div className="flex flex-1 flex-col justify-start max-w-[976px]">
      <div className="text-16M text-primary ">
        Online Registration and Rules
      </div>
      <div className="relative w-fit">
        <div className="text-black text-48M  relative z-10">線上報名與規則</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>

      <div className="mt-[64px] text-16R text-[#252F38B2]  ">
        感謝您對本研討會的支持與關注！如果您有意參加，請先填寫以下的 Google
        線上報名表單，當報名截止時可查看一般與會者
        報名成功名單（按照姓氏筆畫排列，電話末三碼為確認身分用，如有同名者可用電話末三碼加以區分）。
        本研討會不接受現場報名，將以報名資訊確認信中的 QR
        code為報到依據。本研討會不收取任何費用，誠摯邀請您踴躍報名，期待在活動現場與您相見。
      </div>
      <div className="mt-[64px] flex space-x-[32px]">
        <div className="bg-white p-[32px] rounded-[24px] flex-1 min-w-0">
          <div className="text-secondary text-36R ">線上​報名表單​​</div>
          <div className="mt-[32px] max-w-[408px] h-[142px]">
            <div className="text-black text-16R ">
              全部場次已額滿，​線上報名​已截止，亦不接受現場報名。若有報名可查看報名成功名單。​
            </div>
          </div>
          <div className=" mt-[32px] text-[#252F3880] text-16R ">
            最後更新時間：2025／10／16
          </div>
        </div>
        <div className="bg-white p-[32px] rounded-[24px] flex-1 min-w-0">
          <div className="text-secondary text-36R ">
            一般與會者 <br />
            報名成功名單
          </div>
          <div className="mt-[32px] h-[90px]">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSfN3_MHf8fwF7T9FNPsT1FX4K48ZgPSLSPmuiXDqTUW7Hq7g/viewform?usp=sf_link"
              className="text-blue-500 underline text-[15px] leading-[28px] font-[500]  break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              名單詳如本附件，點此即可下載
            </Link>
          </div>
          <div className=" mt-[32px] text-[#252F3880] text-16R ">
            最後更新時間：2025／10／16
          </div>
        </div>
      </div>
    </div>
  );
};
