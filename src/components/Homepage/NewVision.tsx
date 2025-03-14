import Image from "next/image";
import Link from "next/link";

export const NewVision = () => {
  const card = [
    {
      year: "2025",
      date: "03.10",
      content:
        "論文主會議論文之審稿結果已於 3 月 10 日發布。<br />感謝整個程序委員會團隊、程式共同主席、助理主席以及所有審稿人的辛勤付出。",
    },
    {
      year: "2025",
      date: "03.10",
      content:
        "與會名單已公佈，<a href='/success-list'>詳見2025成功錄取名單。</a>",
    },
  ];

  return (
    <div className="w-full  pt-[128px] pb-[160px]">
      <div className="w-[1312px] mx-auto flex-col justify-start">
        <div className="text-16M text-primary">NEW</div>
        <Image
          src="/標題/Frame 767.svg"
          alt="Example"
          width={200}
          height={66}
        />
        <div className="mt-[64px]  bg-[#FFFFFF] p-[32px] rounded-[40px]">
          {card.map((item, index) => (
            <div key={index} className="p-[32px] flex items-center">
              <div>
                <div className="text-[#252F3880] text-14R">{item.year}</div>
                <div className="text-primary text-[20px] font-[700] ">
                  {item.date}
                </div>
              </div>
              <div className="ms-[64px] text-black text-20R">
                {item.content.includes("<a") ? (
                  (() => {
                    const parts = item.content.split(
                      /<a href=["'](.*?)["']>(.*?)<\/a>/
                    );
                    return (
                      <>
                        {parts[0]}
                        <Link
                          href={parts[1]}
                          className="text-blue-500 underline"
                        >
                          {parts[2]}
                        </Link>
                      </>
                    );
                  })()
                ) : (
                  <span dangerouslySetInnerHTML={{ __html: item.content }} />
                )}
              </div>
            </div>
          ))}
          <div className="mt-[32px] flex space-x-[8px] w-fit mx-auto">
            <Image
              src="/icons/24icon/arrow_left.svg"
              alt="arrow"
              width={16}
              height={16}
            />
            <div className="w-[32px] h-[32px] bg-third flex justify-center items-center rounded-[50%]">
              <div className="text-white text-14R">1</div>
            </div>
            <div className="w-[32px] h-[32px] bg-white flex justify-center items-center rounded-[50%]">
              <div className="text-black text-14R">2</div>
            </div>
            <div className="w-[32px] h-[32px] bg-white flex justify-center items-center rounded-[50%] z-0">
              <div className="text-black text-14R z-10">2</div>
            </div>
            <Image
              src="/icons/24icon/arrow_right.svg"
              alt="arrow"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
