"use client";

import { useEffect, useState } from "react";
import { MainVisionButton } from "@/components/Button/MainVisionButton";

const query = `
  query homePage {
    homePage {
      section1
    }
  }
`;

export const MainVision = () => {
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
    <div
      className="h-screen w-screen"
      style={{
        backgroundImage: "url('/banner/icte_banner.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="h-full flex justify-center flex-col mx-[6%]">
        <div className="flex">
          <div className="text-[#009982] text-[80px] laptop:text-[100px] desktop:text-[160px] font-[700] leading-[142%] tracking-[4%] font-title me-8">
            {data.homePage[0].section1.title.left}
          </div>
          <div className="text-[#FFFFFF] text-[80px] laptop:text-[100px] desktop:text-[160px] font-[700] leading-[142%] tracking-[4%] font-title">
            {data.homePage[0].section1.title.right}
          </div>
        </div>
        <div
          className="text-black text-[24px] laptop:text-[36px] desktop:text-[48px] leading-[144%] mt-[-14px]"
          dangerouslySetInnerHTML={{
            __html: data.homePage[0].section1.content.replace(/\n/g, "<br>"),
          }}
        ></div>
        <div className="desktop:mt-[18px] mt-[12px] flex items-center">
          <div className="text-black text-[36px] laptop:text-[48px] desktop:text-[64px] font-[700] leading-[142%] font-title">
            {data.homePage[0].section1.subTitle[0]}
          </div>
          <div className="text-black text-[10px] laptop:text-[16px] desktop:text-[24px] leading-[142%] font-title mt-[31px] ms-[3px]">
            {data.homePage[0].section1.subTitle[1]}
          </div>
          <div className="border-1 w-[96px] flex items-center justify-center mx-[12px]"></div>
          <div className="text-black text-[36px] laptop:text-[48px] desktop:text-[64px] font-[700] leading-[142%] font-title">
            {data.homePage[0].section1.subTitle[2]}
          </div>
          <div className="text-black text-[10px] laptop:text-[16px] desktop:text-[24px] leading-[142%] font-title mt-[31px] ms-[6px]">
            {data.homePage[0].section1.subTitle[3]}
          </div>
        </div>
        <div className="text-black text-[12px] laptop:text-[18px] desktop:text-[24px] font-[500] leading-none">
          {data.homePage[0].section1.location}
        </div>
        <div className="mt-[72px]">
          <MainVisionButton url="/meeting" />
        </div>
      </div>
    </div>
  );
};
