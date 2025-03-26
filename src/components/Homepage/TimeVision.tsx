"use client";
import { useEffect, useState } from "react";
import { TimeVisionButton } from "@/components/Button/TimeVisionButton";
import Image from "next/image";

const query = `
  query homePage {
    homePage {
      section3
    }
  }
`;

export const TimeVision = () => {
  const [data, setData] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      setData(data.homePage[0].section3.times);

      setImgUrl(data.homePage[0].section3.times.image);
    }
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full  pt-[64px] pb-[80px] desktop:pt-[128px] desktop:pb-[160px]  px-3 desktop:px-0">
      <div className="w-full max-w-[1314px] mx-auto ">
        <div className="text-16M text-primary">Important Dates</div>
        <div className="relative w-fit">
          <div className="text-black text-48M  relative z-10">重要時刻</div>
          <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
        </div>

        <div className="desktop:mt-[64px] flex flex-wrap  justify-center gap-[32px]">
          <div className="bg-[#FFFFFF] p-[32px] rounded-[40px]">
            <div className="w-[48px] h-[48px] rounded-[40px] bg-primary flex justify-center items-center">
              <div className="text-[#FFFFFF] text-20M ">1</div>
            </div>
            <div className="text-black text-36M mt-[16px] ">徵稿</div>
            <div className="mt-[32px] w-[240px] h-[204px]">
              <div className="flex">
                <div
                  className="text-primary text-20M me-1"
                  dangerouslySetInnerHTML={{ __html: data.time1 }}
                ></div>
              </div>
            </div>
          </div>
          <div className="bg-[#FFFFFF] p-[32px] rounded-[40px]">
            <div className="w-[48px] h-[48px] rounded-[40px] bg-primary flex justify-center items-center">
              <div className="text-[#FFFFFF] text-20M ">2</div>
            </div>
            <div className="text-black text-36M mt-[16px] ">論文接受通知</div>
            <div className="mt-[32px] w-[240px] h-[204px]">
              <div className=" text-primary text-20M ">{data.time6}</div>
            </div>
          </div>
          <div className="bg-[#FFFFFF] p-[32px] rounded-[40px]">
            <div className="w-[48px] h-[48px] rounded-[40px] bg-primary flex justify-center items-center">
              <div className="text-[#FFFFFF] text-20M ">3</div>
            </div>
            <div className="text-black text-36M mt-[16px] ">論文定稿</div>
            <div className="mt-[32px] w-[240px] h-[117px]">
              <div className=" text-primary text-20M ">{data.time7}</div>
            </div>
            <div className="mt-[32px] w-[240px] ">
              <TimeVisionButton
                text="論文格式與規則"
                textColor="text-white"
                textSize="text-16M"
                bgColor="bg-third"
                padding="p-[16px_24px_16px_24px]"
                src="/button/arrow_right_2.svg"
                url="/meeting/2"
              />
            </div>
          </div>
          <div className="bg-[#FFFFFF] p-[32px] rounded-[40px]">
            <div className="w-[48px] h-[48px] rounded-[40px] bg-primary flex justify-center items-center">
              <div className="text-[#FFFFFF] text-20M ">4</div>
            </div>
            <div className="text-black text-36M mt-[16px] ">線上報名</div>
            <div className="mt-[32px] w-[240px] h-[117px]">
              <div className=" text-primary text-20M ">{data.time8}</div>
            </div>
            <div className="mt-[32px] w-[240px] ">
              <TimeVisionButton
                text="報名費用與規則"
                textColor="text-white"
                textSize="text-16M"
                bgColor="bg-third"
                padding="p-[16px_24px_16px_24px]"
                src="/button/arrow_right_2.svg"
                url="/meeting/3"
              />
            </div>
          </div>
        </div>
        <div className="mt-[32px] flex flex-col desktop:flex-row gap-[32px]">
          <div className="bg-[#FFF8DC] p-[32px] rounded-[40px] ">
            <div className="text-black text-36M ">會議舉辦日期</div>
            <div className="mt-[32px] flex flex-col gap-[16px]">
              <div className="desktop:w-[240px] bg-[#FFEFB0] p-[16px] flex flex-col gap-[4px] rounded-[20px]">
                <div className="text-black text-20M ">會議</div>
                <div className="text-black text-16M ">{data.meeting}</div>
              </div>
              <div className="desktop:w-[240px] bg-[#FFEFB0] p-[16px] flex flex-col gap-[4px] rounded-[20px]">
                <div className="text-black text-20M ">晚宴</div>
                <div className="text-black text-16M ">{data.dinner}</div>
              </div>
            </div>
            <div className="mt-[32px]">
              <TimeVisionButton
                text="交通資訊"
                textColor="text-black"
                textSize="text-16M"
                bgColor="bg-[#FFFFFF]"
                padding="p-[16px_24px_16px_24px]"
                src="/icons/24icon/arrow_right_2.svg"
                url="/meeting"
              />
            </div>
          </div>
          <div className="flex-1  h-[446px]  rounded-[40px]">
            <Image
              src={imgUrl}
              alt="Example"
              width={1920}
              height={1080}
              style={{
                objectFit: "cover",
                borderRadius: "40px",
                width: "100%",
                height: "100%",
              }}
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
};
