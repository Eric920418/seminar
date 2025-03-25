"use client";
import { useEffect, useState } from "react";
import { ConferenceVisionButton } from "@/components/Button/ConferenceVisionButton";
import Image from "next/image";

const query = `
  query homePage {
    homePage {
      section4 
    }
  }
`;

export const ConferenceVision = () => {
  const [data, setData] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const json = await res.json();
      setData(json.data);

      setImgUrl(json.data.homePage[0].section4.images);
    }
    fetchData();
  }, []);

  if (!data || !imgUrl) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full pt-[64px] pb-[80px] desktop:pt-[128px] desktop:pb-[160px] px-3 desktop:px-0">
      <div className="w-full flex flex-col laptop:flex-row items-center justify-center space-x-[64px]">
        <div className="desktop:w-[608px] flex flex-col items-start">
          <div className="text-16M text-primary">conference manual</div>
          <div className="relative w-fit">
            <div className="text-black text-48M relative z-10">
              會議​​手冊下載
            </div>
            <div className="z-0 transform -translate-y-5 w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
          </div>
        </div>
        <div className="bg-[#F0F3F8] rounded-[40px] py-[64px]">
          <div className="desktop:w-[258px] h-[365px] desktop:mx-[191px]">
            <Image
              src={imgUrl}
              width={258}
              height={365}
              alt="Conference Vision"
            />
          </div>
          <div className="mt-[32px] mx-auto w-fit">
            <ConferenceVisionButton
              url={data.homePage[0].section4.manualDownloadUrl}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
