"use client";
import { useState, useRef, useEffect } from "react";
import { gql } from "graphql-tag";
import Image from "next/image";
import { ImageUploader } from "@/components/Admin/ImageUploader";

const UPDATE_PAGE = gql`
  mutation updateHost($input: UpdateHostInput!) {
    updateHost(input: $input) {
      section1
    }
  }
`;
const query = `
  query host {
    host {
      section1
    }
  }
`;

interface Card {
  name: string;
  school: string;
  highest: string;
  interests: string;
  experience: string;
  image: string;
  isHost: boolean;
  isOpen: boolean;
}

interface CardProps {
  card: Card;
  index: number;
  onToggle: (index: number) => void;
  onCardChange: (index: number, field: keyof Card, value: any) => void;
  handleImageUpload: (data: { fileUrl: any; index: number }) => void;
}

// 單一卡片元件
const Card = ({
  card,
  index,
  onToggle,
  onCardChange,
  handleImageUpload,
}: CardProps) => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [card.isOpen]);

  return (
    <div className="bg-gray-200 p-6 rounded-xl w-full">
      <div className="flex justify-between mb-2">
        <div className="text-20M">{card.name}</div>
        <Image
          src="/icons/24icon/arrow_right.svg"
          width={24}
          height={24}
          alt="arrow"
          onClick={() => onToggle(index)}
          className={`cursor-pointer transition-transform duration-300 ${
            card.isOpen ? "rotate-90" : ""
          }`}
        />
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: card.isOpen ? `${contentHeight}px` : "0px" }}
      >
        {/* 卡片內容範例，可依需求自行調整 */}
        <div
          className="rounded-[40px] flex min-h-[538px]"
          style={{
            backgroundImage: `url('/banner/card-img${
              card.isHost ? "1" : "0"
            }.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative w-[414px]">
            <div
              className="absolute top-0 left-0 p-[32px] text-white text-[32px] font-[700] font-NotoSansTC z-10"
              style={{ writingMode: "vertical-rl" }}
            >
              {card.isHost ? "主 持 人" : "與 談 人"}
            </div>
            <div
              className={`absolute desktop:top-[80px] desktop:left-[50px] bg-white 
          ${
            !card.isHost
              ? "rounded-[40px] rotate-[-4deg] translate-y-5 translate-x-5 w-[180px] h-[180px] desktop:w-[280px] desktop:h-[280px]"
              : "rounded-full w-[200px] top-18 left-15 h-[200px] desktop:w-[316px] desktop:h-[316px]"
          } `}
            >
              {card.image && (
                <Image
                  src={card.image ?? null}
                  alt="some image"
                  width={316}
                  height={316}
                  className={`w-full h-full object-cover ${
                    !card.isHost ? "rounded-[40px]" : "rounded-full"
                  } `}
                />
              )}
            </div>
            <div className="absolute top-95 left-0 p-[32px]">
              <div className="text-white text-[32px] font-[700] font-NotoSansTC">
                {card.name}​​​​ ​
              </div>
              <div
                className="mt-[8px] text-white text-[14px] font-[500] leading-[22px] w-[175px] font-NotoSansTC"
                dangerouslySetInnerHTML={{
                  __html: card.school.replace(/\n/g, "<br>"),
                }}
              ></div>
            </div>
          </div>
          <div className="bg-amber-50 p-[32px] flex-1 rounded-r-[40px]">
            <div className="text-primary text-16M font-NotoSansTC">
              關於主持人​
            </div>
            <div className="mt-[24px] bg-[#FFD8561A] p-[16px] rounded-[16px]">
              <div className="text-[#252F3880] text-14R font-NotoSansTC">
                最高學歷​
              </div>
              <div
                className="mt-[8px] text-black text-15R font-NotoSansTC"
                dangerouslySetInnerHTML={{
                  __html: card.highest.replace(/\n/g, "<br>"),
                }}
              ></div>
            </div>
            <div className="mt-[24px] bg-[#FFD8561A] p-[16px] rounded-[16px]">
              <div className="text-[#252F3880] text-14R font-NotoSansTC">
                研究興趣​
              </div>
              <div
                className="mt-[8px] text-black text-15R font-NotoSansTC"
                dangerouslySetInnerHTML={{
                  __html: card.interests.replace(/\n/g, "<br>"),
                }}
              ></div>
            </div>
            <div className="mt-[24px] bg-[#FFD8561A] p-[16px] rounded-[16px]">
              <div className="text-[#252F3880] text-14R font-NotoSansTC">
                經歷​
              </div>
              <div
                className="mt-[8px] text-black text-15R font-NotoSansTC"
                dangerouslySetInnerHTML={{
                  __html: card.experience.replace(/\n/g, "<br>"),
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* 可在此處加入編輯欄位 */}
        <div>
          <div className="flex py-2 space-x-3 items-center">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={card.isHost}
                onChange={(e) =>
                  onCardChange(index, "isHost", e.target.checked)
                }
                className="w-4 h-4"
              />
              <label className="text-sm text-gray-700">
                {card.isHost ? "主持人" : "與談人"}
              </label>
            </div>
            <input
              type="text"
              placeholder="姓名"
              value={card.name}
              onChange={(e) => onCardChange(index, "name", e.target.value)}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
            />
            <textarea
              placeholder="學院"
              value={card.school}
              onChange={(e) => onCardChange(index, "school", e.target.value)}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
            />
          </div>
          <div className="flex py-2 space-x-3">
            <textarea
              placeholder="最高學歷"
              value={card.highest}
              onChange={(e) => onCardChange(index, "highest", e.target.value)}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
            />
            <textarea
              placeholder="研究興趣"
              value={card.interests}
              onChange={(e) => onCardChange(index, "interests", e.target.value)}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
            />
          </div>
          <div className="flex py-2 space-x-3">
            <textarea
              placeholder="經歷"
              value={card.experience}
              onChange={(e) =>
                onCardChange(index, "experience", e.target.value)
              }
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
            />
            <ImageUploader
              onImageUpload={(filename) =>
                handleImageUpload({ fileUrl: { fileUrl: filename }, index })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// 主元件
export const Host = () => {
  // 將每張卡片初始資料包含 isOpen 和 isHost 屬性
  const [editorCards, setEditorCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      // 如果後端資料沒有 isHost 屬性，預設為 true
      const cards: Card[] = data.host[0].section1.editorCards.map(
        (card: Partial<Card>) => ({
          ...card,
          isHost: card.isHost !== undefined ? card.isHost : true,
        })
      );
      setEditorCards(cards);
    };

    fetchData();
  }, []);

  // 處理卡片內容欄位更新
  const handleCardChange = (index: number, field: keyof Card, value: any) => {
    const newCards = [...editorCards];
    newCards[index] = { ...newCards[index], [field]: value };
    setEditorCards(newCards);
    console.log(editorCards);
  };

  // 處理卡片展開／收合開關
  const handleToggle = (index: number) => {
    const newCards = [...editorCards];
    newCards[index] = { ...newCards[index], isOpen: !newCards[index].isOpen };
    setEditorCards(newCards);
  };

  const addCard = () => {
    const newCard: Card = {
      name: "",
      school: "",
      highest: "",
      interests: "",
      experience: "",
      image: "",
      isHost: true, // 預設為主持人
      isOpen: false, // 初始狀態為收合
    };
    setEditorCards([...editorCards, newCard]);
  };

  const DeleteCard = (index: number) => {
    const newCards = editorCards.filter((_, idx) => idx !== index);
    setEditorCards(newCards);
  };

  // 圖片上傳處理
  const handleImageUpload = (data: {
    fileUrl: { fileUrl: string };
    index: number;
  }) => {
    const newCards = [...editorCards];
    if (data.index !== undefined && newCards[data.index]) {
      newCards[data.index] = {
        ...newCards[data.index],
        image: data.fileUrl.fileUrl,
      };
      setEditorCards(newCards);
    }
  };

  const handleUpdate = async () => {
    const input = {
      section1: {
        editorCards,
      },
    };

    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: UPDATE_PAGE.loc?.source.body,
          variables: { input },
        }),
      });
      const result = await response.json();
      if (result.errors) {
        console.error("更新失敗:", JSON.stringify(result.errors, null, 2));
      } else {
        alert("更新成功");
      }
    } catch (err) {
      console.error("更新失敗:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-32M mb-6">主持人</div>
        <button
          className="bg-blue-500 text-white px-2 rounded"
          onClick={addCard}
        >
          新增主持人
        </button>
      </div>
      <div className="flex flex-col  gap-[16px] mt-3">
        {editorCards.map((card, index) => (
          <div className="flex space-x-6 w-full" key={index}>
            <Card
              card={card}
              index={index}
              onToggle={handleToggle}
              onCardChange={handleCardChange}
              handleImageUpload={handleImageUpload}
            />
            <button
              className="bg-red-500 text-white px-3 py-1 rounded"
              onClick={() => DeleteCard(index)}
            >
              刪除
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          更新資料
        </button>
      </div>
    </div>
  );
};
