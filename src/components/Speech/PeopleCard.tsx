export const PeopleCard = () => {
  return (
    <div className=" rounded-[40px] bg-black flex mt-[48px]">
      <div className="relative   w-[414px]">
        <div
          className="absolute top-0 left-0 p-[32px] text-white text-[32px] font-[700] font-NotoSansTC"
          style={{ writingMode: "vertical-rl" }}
        >
          主 持 人
        </div>
        <div className="absolute top-18 left-15 bg-white rounded-[50%] w-[316px] h-[316px]"></div>
        <div className="absolute top-95 left-0 p-[32px] ">
          <div className="text-white text-[32px] font-[700] font-NotoSansTC">
            李慧嬌​​​​ ​教授​
          </div>
          <div className="mt-[8px] text-white text-[14px] font-[500] leading-[22px] w-[175px] font-NotoSansTC">
            國立臺北教育​大學 <br />
            課程與教學傳播科技研究所
          </div>
        </div>
      </div>
      <div className="bg-amber-50 p-[32px] flex-1 rounded-r-[40px]">
        <div className="text-primary text-16M font-NotoSansTC">關於主持人​</div>
        <div className="mt-[24px] bg-[#FFD8561A] p-[16px] rounded-[16px]">
          <div className="text-[#252F3880] text-14R font-NotoSansTC">
            最高學歷​
          </div>
          <div className="mt-[8px] text-black text-15R font-NotoSansTC">
            國立成功大學 企業管理研究所 創新與科技管理組 博士 <br />
            美國 Portland State University 科技管理博士 美國
          </div>
        </div>
        <div className="mt-[24px] bg-[#FFD8561A] p-[16px] rounded-[16px]">
          <div className="text-[#252F3880] text-14R font-NotoSansTC">
            研究興趣​
          </div>
          <div className="mt-[8px] text-black text-15R font-NotoSansTC">
            教育、媒體與社會、媒體素養、學習與績效評估、教育傳播
          </div>
        </div>
        <div className="mt-[24px] bg-[#FFD8561A] p-[16px] rounded-[16px]">
          <div className="text-[#252F3880] text-14R font-NotoSansTC">經歷​</div>
          <div className="mt-[8px] text-black text-15R font-NotoSansTC">
            教育部｜政務次長 <br /> 國立台北教育大學｜師資培育中心教授
            <br />
            國立台北教育大學｜事務長
            <br /> 台北市教育局｜教育局副局長​​​
          </div>
        </div>
      </div>
    </div>
  );
};
