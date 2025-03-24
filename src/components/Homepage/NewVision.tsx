"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const query = `
  query homePage {
    homePage {
      section2
    }
  }
`;

export const NewVision = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const result = await res.json();
      setData(result.data);
    };

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="w-full pt-[64px] pb-[80px] desktop:pt-[128px] desktop:pb-[160px]  px-3 desktop:px-0">
      <div className="w-full max-w-[1314px] mx-auto flex flex-col">
        <div className="text-16M text-primary">NEW</div>
        <div className="relative w-fit">
          <div className="text-black text-48M relative z-10">最新消息</div>
          <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
        </div>

        <div className="max-w-[1314px] mt-[64px] bg-[#FFFFFF] p-[32px] rounded-[40px]">
          {data.homePage[0].section2.cards.map((item, index) => (
            <div key={index} className="p-[32px] flex items-center">
              <div>
                <div className="text-[#252F3880] text-14R">{item.year}</div>
                <div className="text-primary text-[20px] font-[700]">
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
            <div className="w-[32px] h-[32px] bg-white flex justify-center items-center rounded-[50%]">
              <div className="text-black text-14R">3</div>
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
