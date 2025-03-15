"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export const Project = () => {
  const card = [
    {
      title: "AI繪圖融入教學設計網站",
      content: "國立屏東大學｜楊志敏副教授",
      src: "/banner/img4.jpeg",
    },
    {
      title: "AI繪圖融入教學設計網站",
      content: "國立屏東大學｜楊志敏副教授",
      src: "/banner/img4.jpeg",
    },
    {
      title: "AI繪圖融入教學設計網站",
      content: "國立屏東大學｜楊志敏副教授",
      src: "/banner/img4.jpeg",
    },
    {
      title: "AI繪圖融入教學設計網站",
      content: "國立屏東大學｜楊志敏副教授",
      src: "/banner/img4.jpeg",
    },
    {
      title: "AI繪圖融入教學設計網站",
      content: "國立屏東大學｜楊志敏副教授",
      src: "/banner/img4.jpeg",
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
      className={`flex flex-col w-full max-w-[976px] transition-opacity duration-500 ${
        containerFade ? "opacity-100" : "opacity-0"
      }`}
    >
      {selectedIndex !== null && (
        <div className=" text-16M text-[#252F3866]">
          <span onClick={goBack}>作品展示&nbsp;&nbsp;&gt;</span>
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
        Project Showcase
      </div>
      <div className="relative w-fit">
        <div className="text-black text-48M  relative z-10">​作品展示</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>

      {selectedIndex === null && (
        <div className="mt-[64px] grid grid-cols-4 gap-[32px]">
          {card.map((item, index) => {
            const isAnimating = animatingIndex === index;
            return (
              <div
                key={index}
                className="relative rounded-[40px] w-[220px] h-[318px] p-[24px]"
                onClick={() => change(index)}
              >
                <Image
                  src={item.src}
                  fill
                  className="rounded-[40px]"
                  style={{ objectFit: "cover" }}
                  alt="背景圖片"
                />
                <div className="absolute inset-0 bg-[#0DC7AB] opacity-20 rounded-[40px]"></div>
                <div className="absolute inset-0 bg-[#252F38] opacity-50 rounded-[40px]"></div>
                <div className="absolute transform top-55 translate-y-[50%] text-center text-16M text-white ">
                  {item.title}
                </div>
                <div className="absolute transform top-65 translate-y-[50%] text-center text-[12px] text-white ">
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {selectedIndex !== null && (
        <>
          <div className="mt-[64px] w-[976px]  flex items-center justify-between">
            <div className="w-[56px] h-[56px] rounded-[100px] border border-[#252F381A] flex justify-center items-center">
              <Image
                src="/icons/24icon/arrow_left.svg"
                alt="arrow-left"
                width={24}
                height={24}
                onClick={goBack}
              />
            </div>
            <div className="w-[800px] h-[450px] rounded-[40px]">
              <img
                src="/banner/img5.jpeg"
                alt="img5"
                className="rounded-[40px]"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                fill
              />
            </div>
            <div className="w-[56px] h-[56px] rounded-[100px] border border-[#252F381A] flex justify-center items-center">
              <Image
                src="/icons/24icon/arrow_right.svg"
                alt="arrow-left"
                width={24}
                height={24}
                onClick={goBack}
              />
            </div>
          </div>
          <div className="mt-[64px]">
            <div className="text-secondary text-20M">介紹​</div>
            <div className="mt-[24px] text-[#252F38B2] text-16R">
              人工智慧（AI）繪圖技術正重新塑造教學方式。透過AI繪圖，教師能將抽象概念或想像情境轉化為視覺化內容，協助學生快速理解。
              <br />
              例如，在數學課中可運用AI生成的圖像呈現數學概念，在國語課則可重建文學或語文情境，讓學生彷彿身歷其境。語言學習者也能利用AI繪圖來形象化單字和短語，增進記憶與理解。這種教學模式不僅促進學生學習，更為教師提供多元資源。本網站將呈現教學實習課的AI應用案例，期盼未來教師能善用AI的強大功能，輔助教學。
            </div>
          </div>
          <div className="mt-[64px]">
            <div className="text-secondary text-20M">教材研發者​</div>
            <div className="mt-[24px] text-[#252F38B2] text-16R">
              國立屏東大學 師資培育中心｜楊心強副教授 ndm.john@gmail.com
            </div>
          </div>
        </>
      )}
    </div>
  );
};
