"use client";

import { useEffect, useState } from "react";
import { MainVisionButton } from "@/components/Button/MainVisionButton";
import Image from "next/image";

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

const query = `
  query homePage {
    homePage {
      section1
    }
  }
`;

interface HomePageData {
  homePage: [
    {
      section1: {
        image: string;
        title: {
          left: string;
          right: string;
        };
        content: string;
        subTitle: string[];
        location: string;
      };
    }
  ];
}

export const MainVision = () => {
  const [data, setData] = useState<HomePageData | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
          next: { revalidate: 3600 }, // 每小時重新驗證一次
        });
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // 在生產環境中使用適當的錯誤處理
      }
    };

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute inset-0">
        <Image
          src={`${data.homePage[0].section1.image}`}
          alt="首頁背景"
          width={1920}
          height={1080}
          priority
          quality={75}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          onLoadingComplete={() => setIsImageLoading(false)}
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
      <div className="absolute inset-0 flex justify-center flex-col mx-[6%] z-10">
        <div className="flex">
          <div className="text-[#009982] text-[70px] laptop:text-[100px] desktop:text-[160px] font-[700] leading-[142%] tracking-[4%] font-title me-8 opacity-0 animate-fadeIn">
            {data.homePage[0].section1.title.left}
          </div>
          <div className="text-[#FFFFFF] text-[70px] laptop:text-[100px] desktop:text-[160px] font-[700] leading-[142%] tracking-[4%] font-title opacity-0 animate-fadeIn">
            {data.homePage[0].section1.title.right}
          </div>
        </div>
        <div
          className="text-black text-[24px] laptop:text-[36px] desktop:text-[48px] leading-[144%] mt-[-14px] opacity-0 animate-fadeIn"
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
          <MainVisionButton url="/meeting/3" />
        </div>
      </div>
    </div>
  );
};
