import Image from "next/image";

interface Card {
  name: string;
  school: string;
  highest: string;
  interests: string;
  experience: string;
  image: string;
  role?: "host" | "panelist" | "speaker";
  isHost?: boolean;
}

interface PeopleCardProps {
  card: Card;
}

export const PeopleCard = ({ card }: PeopleCardProps) => {
  if (!card) {
    return null;
  }

  const cardRole = card.role || (card.isHost ? "host" : "panelist");

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "host":
        return "主持人";
      case "speaker":
        return "主講人";
      case "panelist":
        return "與談人";
      default:
        return "主持人";
    }
  };

  const getBackgroundImageIndex = (role: string) => {
    return role === "host" || role === "speaker" ? "1" : "0";
  };

  return (
    <div
      className="rounded-[40px] flex flex-col desktop:flex-row mt-12 desktop:mt-[48px] min-h-[538px]"
      style={{
        backgroundImage: `url('/banner/card-img${getBackgroundImageIndex(cardRole)}.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 左側：圖片與基本資訊 */}
      <div className="relative w-full h-[300px] desktop:h-auto desktop:w-[414px]">
        <div
          className="absolute top-3 desktop:top-[-10px] desktop:left-[-10px] p-4 desktop:p-[32px] text-white text-[24px] desktop:text-[32px] font-[700] font-NotoSansTC z-10"
          style={{ writingMode: "vertical-rl" }}
        >
          {getRoleDisplayName(cardRole).split("").join(" ")}
        </div>
        {/* 圖片容器，手機版尺寸較小，桌機版較大 */}
        <div
          className={`absolute desktop:top-[80px] desktop:left-[50px] bg-white 
                ${
                  cardRole === "panelist"
                    ? "rounded-[40px] rotate-[-4deg] translate-y-5 translate-x-20 desktop:translate-x-5 w-[180px] h-[180px] desktop:w-[280px] desktop:h-[280px]"
                    : "rounded-full left-20 top-5 w-[200px] h-[200px] desktop:w-[316px] desktop:h-[316px]"
                } 
            `}
        >
          {card.image && (
            <Image
              src={card.image ?? null}
              alt="some image"
              width={1920}
              height={1080}
              className={`w-full h-full object-cover ${
                cardRole === "panelist" ? "rounded-[40px]" : "rounded-full"
              }`}
            />
          )}
        </div>
        {/* 名字與學校資訊，手機版位置較低 */}
        <div className="absolute top-50 desktop:top-90 left-0 p-4 desktop:p-[32px]">
          <div className="text-white text-[24px] desktop:text-[32px] font-[700] font-NotoSansTC">
            {card.name} ​
          </div>
          <div
            className="mt-2 text-white text-sm desktop:text-[14px] font-[500] leading-[22px] w-[175px] font-NotoSansTC"
            dangerouslySetInnerHTML={{
              __html: card.school.replace(/\n/g, "<br>"),
            }}
          ></div>
        </div>
      </div>
      {/* 右側：詳細介紹 */}
      <div className="bg-amber-50 p-4 desktop:p-[32px] flex-1 rounded-b-[40px] desktop:rounded-r-[40px] desktop:rounded-bl-none mt-4 desktop:mt-0">
        <div className="text-primary text-base desktop:text-16M font-NotoSansTC">
          關於{getRoleDisplayName(cardRole)}​
        </div>
        <div className="mt-4 bg-[#FFD8561A] p-4 desktop:p-[16px] rounded-[16px]">
          <div className="text-[#252F3880] text-sm desktop:text-14R font-NotoSansTC">
            最高學歷​
          </div>
          <div
            className="mt-2 text-black text-sm desktop:text-15R font-NotoSansTC"
            dangerouslySetInnerHTML={{
              __html: card.highest.replace(/\n/g, "<br>"),
            }}
          ></div>
        </div>
        <div className="mt-4 bg-[#FFD8561A] p-4 desktop:p-[16px] rounded-[16px]">
          <div className="text-[#252F3880] text-sm desktop:text-14R font-NotoSansTC">
            研究興趣​
          </div>
          <div
            className="mt-2 text-black text-sm desktop:text-15R font-NotoSansTC"
            dangerouslySetInnerHTML={{
              __html: card.interests.replace(/\n/g, "<br>"),
            }}
          ></div>
        </div>
        <div className="mt-4 bg-[#FFD8561A] p-4 desktop:p-[16px] rounded-[16px]">
          <div className="text-[#252F3880] text-sm desktop:text-14R font-NotoSansTC">
            經歷​
          </div>
          <div
            className="mt-2 text-black text-sm desktop:text-15R font-NotoSansTC"
            dangerouslySetInnerHTML={{
              __html: card.experience.replace(/\n/g, "<br>"),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
