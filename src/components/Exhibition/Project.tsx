"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const query = `
  query exhibitionPage {
    exhibitionPage {
      section1 
    }
  }
`;

export const Project = () => {
  const [card, setCard] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // 新增 selectedImageIndex 來紀錄目前選中卡片中的圖片索引
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [containerFade, setContainerFade] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 取得資料並轉換 imageSrc 與 images (二進位資料轉 URL)
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      const cards = data.exhibitionPage[0].section1.card;
      setCard(cards);
    }
    fetchData();
  }, []);

  // 當選中卡片變更時，重置選中圖片索引
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedIndex]);

  // 改變選中卡片（並觸發漸變動畫）
  const change = (index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setContainerFade(false);
    timeoutRef.current = setTimeout(() => {
      setSelectedIndex(index);
      setContainerFade(true);
    }, 500);
  };

  // 返回列表
  const goBack = () => {
    setContainerFade(false);
    setTimeout(() => {
      setSelectedIndex(null);
      setContainerFade(true);
    }, 500);
  };

  // 切換至上一張圖片
  const handlePrevImage = () => {
    if (selectedIndex === null) return;
    const images = card[selectedIndex].images;
    if (!images || images.length === 0) return;
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // 切換至下一張圖片
  const handleNextImage = () => {
    if (selectedIndex === null) return;
    const images = card[selectedIndex].images;
    if (!images || images.length === 0) return;
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // 清除 timeout 以及在元件卸載時釋放所有 object URL

  return (
    <div
      className={`flex flex-col  w-screen max-w-[976px]  px-3 desktop:px-0 transition-opacity duration-500 ${
        containerFade ? "opacity-100" : "opacity-0"
      }`}
    >
      {selectedIndex !== null && (
        <div className="text-16M text-[#252F3866]">
          <span onClick={goBack} className="cursor-pointer">
            作品展示&nbsp;&nbsp;&gt;
          </span>
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
        <div className="text-black text-48M relative z-10">​作品展示</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>

      {/* 卡片列表：當沒有選中卡片時顯示 */}
      {selectedIndex === null && (
        <div className="mt-[64px] grid  desktop:grid-cols-4 gap-[32px] mx-auto">
          {card.map((item, index) => (
            <div
              key={index}
              className="relative rounded-[40px] w-[220px] h-[318px] p-[24px] cursor-pointer"
              onClick={() => change(index)}
            >
              {item.imageSrc ? (
                <Image
                  src={item.imageSrc}
                  fill
                  className="rounded-[40px]"
                  style={{ objectFit: "cover" }}
                  alt="背景圖片"
                />
              ) : (
                <div className="flex justify-center items-center h-full">
                  <div className="text-16M text-secondary">尚未公布</div>
                </div>
              )}
              <div className="absolute inset-0 bg-[#0DC7AB] opacity-20 rounded-[40px]"></div>
              <div className="absolute inset-0 bg-[#252F38] opacity-50 rounded-[40px]"></div>
              <div className="absolute transform top-55 translate-y-[50%] text-center text-16M text-white">
                {item.title}
              </div>
              <div className="absolute transform top-65 translate-y-[50%] text-center text-[12px] text-white">
                {item.content}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 選中卡片後的展示 */}
      {selectedIndex !== null && (
        <>
          <div className="desktop:mt-[64px] desktop:w-[976px] flex items-center justify-between">
            {/* 左箭頭按鈕，點擊切換上一張圖片 */}
            <div className="w-[56px] h-[56px] rounded-full border border-[#252F381A] flex justify-center items-center cursor-pointer">
              <Image
                src="/icons/24icon/arrow_left.svg"
                alt="arrow-left"
                width={24}
                height={24}
                onClick={handlePrevImage}
              />
            </div>
            {/* 顯示目前選中卡片的圖片 */}
            {card[selectedIndex].images &&
              card[selectedIndex].images.length > 0 && (
                <div className="w-[800px] h-[450px] overflow-hidden flex justify-center items-center">
                  <Image
                    src={card[selectedIndex].images[selectedImageIndex]}
                    alt={`圖片 ${selectedImageIndex + 1}`}
                    width={1920}
                    height={1080}
                    className="object-contain object-center rounded-[40px]"
                  />
                </div>
              )}
            {/* 右箭頭按鈕，點擊切換下一張圖片 */}
            <div className="w-[56px] h-[56px] rounded-full border border-[#252F381A] flex justify-center items-center cursor-pointer">
              <Image
                src="/icons/24icon/arrow_right.svg"
                alt="arrow-right"
                width={24}
                height={24}
                onClick={handleNextImage}
              />
            </div>
          </div>
          <div className="mt-[32px] desktop:mt-[64px] px-3 desktop:px-0">
            <div className="text-secondary text-20M">介紹​</div>
            <div
              className="mt-[24px] text-[#252F38B2] text-16R"
              dangerouslySetInnerHTML={{
                __html: card[selectedIndex].introduce.replace(/\n/g, "<br>"),
              }}
            ></div>
          </div>
          <div className="mt-[32px] desktop:mt-[64px] px-3 desktop:px-0">
            <div className="text-secondary text-20M">教材研發者​</div>
            <div
              className="mt-[24px] text-[#252F38B2] text-16R"
              dangerouslySetInnerHTML={{
                __html: card[selectedIndex].developer.replace(/\n/g, "<br>"),
              }}
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Project;
