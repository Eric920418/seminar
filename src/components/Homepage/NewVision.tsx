import Image from "next/image";
import Link from "next/link";

const query = `
  query homePage {
    homePage {
      section2
    }
  }
`;

export const NewVision = async () => {
  const res = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const { data } = await res.json();

  return (
    <div className="w-full  pt-[128px] pb-[160px]">
      <div className="w-full max-w-[1314px] mx-auto  flex flex-col ">
        <div className="text-16M text-primary">NEW</div>
        <div className="relative w-fit">
          <div className="text-black text-48M  relative z-10">最新消息</div>
          <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
        </div>

        <div className="max-w-[1314px] mt-[64px]  bg-[#FFFFFF] p-[32px] rounded-[40px] ">
          {data.homePage[0].section2.cards.map((item, index) => (
            <div key={index} className="p-[32px] flex items-center">
              <div>
                <div className="text-[#252F3880] text-14R">{item.year}</div>
                <div className="text-primary text-[20px] font-[700] ">
                  {item.date}
                </div>
              </div>
              <div className="ms-[64px] text-black text-20R">
                <span dangerouslySetInnerHTML={{ __html: item.content }} />
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
