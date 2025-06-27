"use client";

import { useEffect, useState } from "react";
import { MainVisionButton } from "@/components/Button/MainVisionButton";
import Image from "next/image";

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRseHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/2wBDAR4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

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
        toggle: boolean;
      };
    }
  ];
}

export const MainVision = () => {
  const [data, setData] = useState<HomePageData | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ query }),
          cache: "no-store",
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Failed to fetch data: ${errorText}`);
        }

        const result = await res.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        setData(result.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error instanceof Error ? error.message : "發生未知錯誤");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      {data.homePage[0].section1.toggle ? (
        <div className="relative h-screen  laptop:h-screen desktop:h-screen w-screen mt-[85px] laptop:mt-[0px] desktop:mt-[0px]">
          <div className="bg-white flex items-center justify-center h-full w-full absolute inset-0">
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
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                isImageLoading ? "opacity-0" : "opacity-100"
              }`}
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 flex justify-center flex-col mx-[6%] z-10">
            <div className="flex">
              <div className="text-[#009982] text-[60px] laptop:text-[100px] desktop:text-[160px] font-[700] leading-[142%] tracking-[4%] font-title me-8 opacity-0 animate-fadeIn">
                {data.homePage[0].section1.title.left}
              </div>
              <div className="text-[#FFFFFF] text-[60px] laptop:text-[100px] desktop:text-[160px] font-[700] leading-[142%] tracking-[4%] font-title opacity-0 animate-fadeIn">
                {data.homePage[0].section1.title.right}
              </div>
            </div>
            <div
              className="text-black text-[20px] laptop:text-[36px] desktop:text-[48px] leading-[144%] mt-[-14px] opacity-0 animate-fadeIn"
              dangerouslySetInnerHTML={{
                __html: data.homePage[0].section1.content.replace(
                  /\n/g,
                  "<br>"
                ),
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
            <div className="mt-[36px] laptop:mt-[72px] desktop:mt-[72px]">
              <MainVisionButton url="/meeting/3" />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative laptop:h-screen desktop:h-screen w-screen mt-[75px] laptop:mt-[0px] desktop:mt-[0px] max-w-[99vw]">
          <div className="bg-white flex items-center justify-center max-h-[100vh] ">
            <Image
              src={`${data.homePage[0].section1.image}`}
              alt="首頁背景"
              width={100}
              height={100}
              priority
              quality={75}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              onLoadingComplete={() => setIsImageLoading(false)}
              className={`w-full  object-contain transition-opacity duration-500 ${
                isImageLoading ? "opacity-0" : "opacity-100"
              }`}
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 flex justify-center flex-col mx-[6%] z-10">
            <div className="mt-[36px] laptop:mt-[72px] desktop:mt-[72px]">
              <MainVisionButton url="/meeting/3" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
