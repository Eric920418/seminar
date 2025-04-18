"use client";

import { useEffect, useState } from "react";

interface VideoData {
  video1: string;
  year: string;
}

const query = `
  query homePage {
    homePage {
      section5
    }
  }
`;

export const VideoVision = () => {
  const [videoUrl, setVideoUrl] = useState<VideoData | null>({
    video1: "",
    year: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        const { data } = await res.json();
        if (data?.homePage?.[0]?.section5) {
          setVideoUrl(data.homePage[0].section5.videoUrl);
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full pt-[64px] pb-[80px] desktop:pt-[128px] desktop:pb-[160px]  px-3 desktop:px-0">
      <div className="w-full justify-center flex-row laptop:flex items-center space-x-[64px]">
        <div className="desktop:w-[608px] flex flex-col items-start">
          <div className="text-16M text-primary">video</div>
          <div className="relative w-fit">
            <div className="text-black text-48M relative z-10">會後影片</div>
            <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
          </div>
        </div>
        <div>
          <div className="rounded-[40px] laptop:w-[540px] desktop:w-[640px] h-[360px]">
            {videoUrl?.video1 ? (
              <iframe
                width="100%"
                height="100%"
                style={{ width: "100%", height: "100%", borderRadius: "40px" }}
                src={`https://www.youtube.com/embed/${videoUrl.video1}?si=YEACs7k0u1_CezFi`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="w-full h-full flex justify-center items-center">
                敬請期待
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
