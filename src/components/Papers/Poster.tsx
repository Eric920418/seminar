"use client";
import { useState, useRef, useEffect } from "react";

import { PDFViewer } from "@/components/PDFViewer";

export const Poster = () => {
  const card = [
    {
      title: "白玉蓮",
      content: "卡那卡那富族語影音檔教學實施在幼生家庭之初探",
    },
    {
      title: "林品慈",
      content: "從NPO展開場域協作的新可能—以屏東校訂課程輔導團為例",
    },
    {
      title: "白玉蓮",
      content: "卡那卡那富族語影音檔教學實施在幼生家庭之初探",
    },
    {
      title: "白玉蓮",
      content: "卡那卡那富族語影音檔教學實施在幼生家庭之初探",
    },
    {
      title: "白玉蓮",
      content: "卡那卡那富族語影音檔教學實施在幼生家庭之初探",
    },
    {
      title: "白玉蓮",
      content: "卡那卡那富族語影音檔教學實施在幼生家庭之初探",
    },
    {
      title: "白玉蓮",
      content: "卡那卡那富族語影音檔教學實施在幼生家庭之初探",
    },
    {
      title: "白玉蓮",
      content: "卡那卡那富族語影音檔教學實施在幼生家庭之初探",
    },
    {
      title: "白玉蓮",
      content: "卡那卡那富族語影音檔教學實施在幼生家庭之初探",
    },
    {
      title: "白玉蓮",
      content: "卡那卡那富族語影音檔教學實施在幼生家庭之初探",
    },
    {
      title: "白玉蓮",
      content: "卡那卡那富族語影音檔教學實施在幼生家庭之初探",
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  const [containerFade, setContainerFade] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const change = (index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setAnimatingIndex(index);

    setContainerFade(false);

    timeoutRef.current = setTimeout(() => {
      setSelectedIndex(index);
      setAnimatingIndex(null);

      setContainerFade(true);
    }, 500);
  };

  const goBack = () => {
    setContainerFade(false);
    setTimeout(() => {
      setSelectedIndex(null);
      setContainerFade(true);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      className={`flex flex-1 flex-col justify-start max-w-[976px] transition-opacity duration-500 ${
        containerFade ? "opacity-100" : "opacity-0"
      }`}
    >
      {selectedIndex !== null && (
        <div className=" text-16M text-[#252F3866]">
          <span onClick={goBack}>海報發表場次&nbsp;&nbsp;&gt;</span>
          <span className="text-secondary">
            &nbsp;&nbsp;
            {(selectedIndex + 1).toString().padStart(2, "0")}.{" "}
            {card[selectedIndex].title}
          </span>
        </div>
      )}

      <div
        className={`text-16M text-primary ${
          selectedIndex !== null ? "mt-[64px]" : ""
        }`}
      >
        Poster Presentation Sessions
      </div>
      <div className="relative w-fit">
        <div className="text-black text-48M  relative z-10">海報發表場次</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>

      {selectedIndex === null && (
        <div className="mt-[64px] grid grid-cols-4 gap-[32px]">
          {card.map((item, index) => {
            const isAnimating = animatingIndex === index;
            return (
              <div
                key={index}
                className={`p-[24px] rounded-[24px] w-[220px] cursor-pointer ${
                  isAnimating ? "bg-third" : "bg-[#F4F7FD]"
                }`}
                onClick={() => change(index)}
              >
                <div className="flex items-center space-x-[8px]">
                  <div
                    className={`w-[33px] h-[33px] rounded-[40px] flex justify-center items-center ${
                      isAnimating ? "bg-[#00878580]" : "bg-[#0DC7AB1A]"
                    }`}
                  >
                    <div
                      className={`text-[14px] font-[500] ${
                        isAnimating ? "text-white" : "text-secondary"
                      }`}
                    >
                      {(index + 1).toString().padStart(2, "0")}
                    </div>
                  </div>
                  <div
                    className={`text-16M font-medium transition-all ease-in-out duration-500 ${
                      isAnimating ? "text-white" : "text-[#252F38B2]"
                    }`}
                  >
                    {item.title}
                  </div>
                </div>
                <div
                  className={`mt-[8px] text-16M font-medium transition-all ease-in-out duration-500 ${
                    isAnimating ? "text-white" : "text-[#252F38B2]"
                  }`}
                >
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedIndex !== null && (
        <div className="mt-[64px] rounded-[40px] bg-[#F4F7FD] w-[976px]">
          <PDFViewer />
        </div>
      )}
    </div>
  );
};
