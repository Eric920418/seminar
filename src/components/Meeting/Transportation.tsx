import Image from "next/Image";

export const Transportation = () => {
  return (
    <div className="flex flex-1 flex-col justify-start max-w-[976px]">
      <div className="text-16M text-primary ">Transportation</div>
      <div className="relative">
        <div className="text-black text-48M  relative z-10">交通</div>
        <div className="z-0 transform translate-y-[-20px]">
          <Image
            src="/標題/Rectangle 249.svg"
            alt="Rectangle"
            width={200}
            height={28}
          />
        </div>
      </div>
      <div className="mt-[64px]">
        <div className="text-secondary text-20M ">會議預定地點</div>
        <div className="text-[#252F38B2] text-20M  mt-[24px]">
          國立臺北教育大學至善樓國際會議廳
        </div>
      </div>
      <div className="mt-[64px]">
        <div className="text-secondary text-20M ">交通方式</div>
        <ul className=" mt-[24px] list-disc list-inside">
          <div className="flex">
            <li></li>
            <div className="text-[#252F38B2] text-16R ">
              捷運：文湖線「科技大樓站」出口行至和平東路左轉約一分鐘即可抵達。
            </div>
          </div>
          <div className="flex">
            <li></li>
            <div className="text-[#252F38B2] text-16R ">
              公車（復興南路口站下車）：237、295、紅57、復興幹線
            </div>
          </div>
          <div className="flex">
            <li></li>
            <div className="text-[#252F38B2] text-16R ">
              公車（國立臺北教育大學站下車）：18、52、72、207、211、235、278、278(區間車)、284、568、662、663、680、685、688、和平幹線
            </div>
          </div>
          <div className="flex">
            <li></li>
            <div className="text-[#252F38B2] text-16R ">
              U-bike：捷運站出口左方麥當勞旁可供U-bike
            </div>
          </div>
        </ul>
      </div>
      <div className="mt-[64px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.514602372264!2d121.54103287637495!3d25.025035239983518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442acfc5c3b7c31%3A0x16d7713efcf64c84!2z5ZyL56uL5Y-w5YyX5Y2X5Lqs5aSn5a245aSa5bC85aSa5Y-w5Y2X5Lqs5aSn!5e0!3m2!1szh-TW!2stw!4v1700000000000"
          width="976"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};
