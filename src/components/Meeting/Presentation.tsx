export const Presentation = () => {
  return (
    <div className="flex flex-1 flex-col justify-start ">
      <div className="text-16M text-primary ">Presentation Guidelines</div>
      <div className="relative w-fit">
        <div className="text-black text-48M  relative z-10">​發表規則</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>
      <div className="w-[976px] ">
        <div className="mt-[64px] flex space-x-[32px] ">
          <div className="bg-white p-[32px] rounded-[24px] flex-1 min-w-0">
            <div className="text-secondary text-20M ">
              圓桌論﻿壇I、II、III、IV
            </div>
            <div className="mt-[24px] text-black text-[15px] leading-[28px] font-[500] ">
              各場次皆為60分鐘
            </div>
            <div className=" mt-[16px] text-black text-[15px] leading-[28px] font-[400] ">
              一、 主持人開場：10分鐘。 <br />
              二、與談人發表時間：各20分鐘，共40分鐘。
              <br />
              三、來賓及與談人Q&A時間：10分鐘。
            </div>
          </div>
          <div className="bg-white p-[32px] rounded-[24px] flex-1 min-w-0">
            <div className="text-secondary text-20M ">
              國外學者專題演講I、II、III
            </div>
            <div className="mt-[24px] text-black text-[15px] leading-[28px] font-[500] ">
              各場次皆為50分鐘
            </div>
            <div className=" mt-[16px] text-black text-[15px] leading-[28px] font-[400] ">
              一、主持人開場：5分鐘。 <br />
              二、主講人發表時間：40分鐘。 <br />
              三​、來賓與主講人Q&A時間：5分鐘。
            </div>
          </div>
        </div>
        <div className="mt-[32px] ">
          <div className="bg-white p-[32px] rounded-[24px] flex-1 min-w-0">
            <div className="text-secondary text-20M ">論文發表</div>
            <div className="mt-[24px] text-black text-[15px] leading-[28px] font-[500] ">
              每場次3-4篇，60-80分鐘
            </div>
            <div className=" mt-[16px] text-black text-[15px] leading-[28px] font-[400] ">
              一、主持人開場時間：3分鐘（含播放議事規則影片）。 <br />
              二​、各主題發表時間20分鐘，於19分鐘按一聲短鈴，於20分鐘按一聲長鈴提醒並結束發表。
              <br />
              三、​ 最後由主持人帶領討論Q&A，時間5分鐘。 <br />
              四、若該場次發表4篇，則各主題發表時間15分鐘，於14分鐘按一聲短鈴，於15分鐘按一聲長鈴提醒並結束發表。
              <br />
              五、主持人可視需求彈性延長各篇發表及討論時間。 <br />
            </div>
          </div>
        </div>
        <div className="mt-[32px] flex space-x-[32px] ">
          <div className="bg-white p-[32px] rounded-[24px] flex-1 min-w-0">
            <div className="text-secondary text-20M ">工作坊</div>
            <div className="mt-[24px] text-black text-[15px] leading-[28px] font-[500] ">
              各場次皆為140分鐘（含休息）
            </div>
            <div className=" mt-[16px] text-black text-[15px] leading-[28px] font-[400] ">
              一、由主講老師自行分配。 <br />
              二​​​、中間穿插20分鐘休息時間。
            </div>
          </div>
          <div className="bg-white p-[32px] rounded-[24px] flex-1 min-w-0">
            <div className="text-secondary text-20M ">
              Excell﻿ence in Teaching Talk（EIT Talk）
            </div>
            <div className="mt-[24px] text-black text-[15px] leading-[28px] font-[500] ">
              100分鐘
            </div>
            <div className=" mt-[16px] text-black text-[15px] leading-[28px] font-[400] ">
              一、主持人時間：10分鐘。
              <br />
              二、主講人時間：各20分鐘，共80分鐘。
              <br />
              三、最後由主持人帶Q&A，時間10分鐘。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
