import Image from "next/Image";
export const PeopleCard = ({ card }) => {
  if (!card) {
    return null;
  }
  return (
    <div className="rounded-[40px] bg-black flex mt-[48px] min-h-[538px]">
      <div className="relative w-[414px]">
        <div
          className="absolute top-0 left-0 p-[32px] text-white text-[32px] font-[700] font-NotoSansTC"
          style={{ writingMode: "vertical-rl" }}
        >
          主 持 人
        </div>
        {/* 如果需要顯示圖片，可以加上 img 元素 */}
        <div className="absolute top-18 left-15 bg-white rounded-[50%] w-[316px] h-[316px]">
          {card.image && (
            <Image
              src={card.image ?? null}
              alt="some image"
              width={316}
              height={316}
              className="w-full h-full object-cover rounded-[50%]"
            />
          )}
        </div>
        <div className="absolute top-95 left-0 p-[32px]">
          <div className="text-white text-[32px] font-[700] font-NotoSansTC">
            {card.name} ​教授​
          </div>
          <div
            className="mt-[8px] text-white text-[14px] font-[500] leading-[22px] w-[175px] font-NotoSansTC"
            dangerouslySetInnerHTML={{
              __html: card.school.replace(/\n/g, "<br>"),
            }}
          ></div>
        </div>
      </div>
      <div className="bg-amber-50 p-[32px] flex-1 rounded-r-[40px]">
        <div className="text-primary text-16M font-NotoSansTC">關於主持人​</div>
        <div className="mt-[24px] bg-[#FFD8561A] p-[16px] rounded-[16px]">
          <div className="text-[#252F3880] text-14R font-NotoSansTC">
            最高學歷​
          </div>
          <div
            className="mt-[8px] text-black text-15R font-NotoSansTC"
            dangerouslySetInnerHTML={{
              __html: card.highest.replace(/\n/g, "<br>"),
            }}
          ></div>
        </div>
        <div className="mt-[24px] bg-[#FFD8561A] p-[16px] rounded-[16px]">
          <div className="text-[#252F3880] text-14R font-NotoSansTC">
            研究興趣​
          </div>
          <div
            className="mt-[8px] text-black text-15R font-NotoSansTC"
            dangerouslySetInnerHTML={{
              __html: card.interests.replace(/\n/g, "<br>"),
            }}
          ></div>
        </div>
        <div className="mt-[24px] bg-[#FFD8561A] p-[16px] rounded-[16px]">
          <div className="text-[#252F3880] text-14R font-NotoSansTC">經歷​</div>
          <div
            className="mt-[8px] text-black text-15R font-NotoSansTC"
            dangerouslySetInnerHTML={{
              __html: card.experience.replace(/\n/g, "<br>"),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
