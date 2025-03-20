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

// 單一卡片元件
const Card = ({ card, index, onToggle, onCardChange, handleImageUpload }) => {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [card.isOpen]);

  return (
    <div className="bg-gray-200 p-6 rounded-xl">
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
        <div className="rounded-[40px] bg-black flex min-h-[538px]">
          <div className="relative w-[414px]">
            <div
              className="absolute top-0 left-0 p-[32px] text-white text-[32px] font-[700] font-NotoSansTC"
              style={{ writingMode: "vertical-rl" }}
            >
              主 持 人
            </div>
            <div className="absolute top-18 left-15 bg-white rounded-[50%] w-[316px] h-[316px]"></div>
            <div className="absolute top-95 left-0 p-[32px]">
              <div className="text-white text-[32px] font-[700] font-NotoSansTC">
                {card.name}​​​​ ​教授​
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
          <div className="flex py-2 space-x-3">
            <input
              type="text"
              placeholder="教授"
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
              uploaderId={`uploader${index}`}
              onImageUpload={(data) => handleImageUpload({ ...data, index })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// 主元件
export const Host = () => {
  // 將每張卡片初始資料包含 isOpen 屬性
  const [editorCards, setEditorCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      setEditorCards(data.host[0].section1.editorCards);
    };

    fetchData();
  }, []);

  // 處理卡片內容欄位更新
  const handleCardChange = (index, field, value) => {
    const newCards = [...editorCards];
    newCards[index] = { ...newCards[index], [field]: value };
    setEditorCards(newCards);
    console.log(editorCards);
  };

  // 處理卡片展開／收合開關
  const handleToggle = (index) => {
    const newCards = [...editorCards];
    newCards[index].isOpen = !newCards[index].isOpen;
    setEditorCards(newCards);
  };

  const addCard = () => {
    setEditorCards([
      ...editorCards,
      {
        name: "",
        school: "",
        highest: "",
        interests: "",
        experience: "",
        image: "",
        isOpen: false, // 初始狀態為收合
      },
    ]);
  };

  // 圖片上傳處理
  const handleImageUpload = (data) => {
    const newCards = [...editorCards];
    if (data.index !== undefined && newCards[data.index]) {
      newCards[data.index].image = data;
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
      const response = await fetch("http://localhost:3000/api/graphql", {
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
      <div className="flex flex-col gap-[16px] mt-3">
        {editorCards.map((card, index) => (
          <Card
            key={index}
            card={card}
            index={index}
            onToggle={handleToggle}
            onCardChange={handleCardChange}
            handleImageUpload={handleImageUpload}
          />
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
