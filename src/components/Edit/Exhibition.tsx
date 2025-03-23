"use client";
import { gql } from "graphql-tag";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ImageUploader } from "@/components/Admin/ImageUploader";

const UPDATE_PAGE = gql`
  mutation UpdateExhibitionPage($input: UpdateExhibitionPageInput!) {
    updateExhibitionPage(input: $input) {
      section1
      section2
    }
  }
`;

const query = `
  query exhibitionPage {
    exhibitionPage {
      section1
      section2
    }
  }
`;

const query2 = `
  query event {
    event {
      section1
    }
  }
`;
type CardType = {
  id: string;
  title: string;
  title2: string; // 新增此屬性
};

interface SelectEvent {
  title: string;
  id: string;
}

interface ExhibitionCard {
  id: string;
  date: string;
  title: string;
  content: string;
  imageSrc: string;
  images: string[];
  introduce: string;
  developer: string;
}

export const Exhibition = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [height1, setHeight1] = useState(0);
  const contentRef1 = useRef<HTMLDivElement>(null);

  const [isOpen2, setIsOpen2] = useState(false);
  const [height2, setHeight2] = useState(0);
  const contentRef2 = useRef<HTMLDivElement>(null);

  const [editorCards, setEditorCards] = useState<ExhibitionCard[]>([]);
  const [editorCards2, setEditorCards2] = useState<ExhibitionCard[]>([]);

  const [isFinish, setIsFinish] = useState(true);
  const [selectEvent, setSelectEvent] = useState<SelectEvent[]>([]);

  useEffect(() => {
    if (contentRef1.current) {
      setHeight1(isOpen1 ? contentRef1.current.scrollHeight : 0);
    }
  }, [isOpen1, editorCards]);

  useEffect(() => {
    if (contentRef2.current) {
      setHeight2(isOpen2 ? contentRef2.current.scrollHeight : 0);
    }
  }, [isOpen2, editorCards2]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      setEditorCards(data.exhibitionPage[0].section1.card);
      setEditorCards2(data.exhibitionPage[0].section2.card);
    };

    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:3000/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: query2,
          }),
        });
        const { data } = await res.json();
        const events = [...selectEvent];
        data.event[0].section1.editorCards.forEach((card: CardType) => {
          events.push({
            title: card.title2,
            id: card.id,
          });
        });
        setSelectEvent(events);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    }
    fetchData();
  }, [selectEvent]);

  const handleCardChange = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    const newCards = [...editorCards];
    newCards[index] = {
      ...newCards[index],
      [field]: value,
    };
    setEditorCards(newCards);
  };

  const addCard = () => {
    setEditorCards([
      ...editorCards,
      {
        title: "",
        content: "",
        imageSrc: "",
        images: [],
        introduce: "",
        developer: "",
      },
    ]);
  };

  const DeleteCard = (index: number) => {
    const newCards = editorCards.filter((_, idx) => idx !== index);
    setEditorCards(newCards);
  };

  const handleCardChange2 = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    const newCards = [...editorCards2];
    newCards[index] = {
      ...newCards[index],
      [field]: value,
    };
    setEditorCards2(newCards);
  };

  const addCard2 = () => {
    setEditorCards2([...editorCards2, { date: "", id: "" }]);
  };

  const DeleteCard2 = (index: number) => {
    const newCards = editorCards2.filter((_, idx) => idx !== index);
    setEditorCards2(newCards);
  };

  const handleImageUpload = (data) => {
    const newCards = [...editorCards];
    if (data.index !== undefined && newCards[data.index]) {
      newCards[data.index].imageSrc = data.fileUrl.fileUrl;
      setEditorCards(newCards);
    }
  };

  const handleImageUpload2 = (data) => {
    console.log(data);
    const newCards = [...editorCards];
    if (data.index !== undefined && newCards[data.index]) {
      newCards[data.index] = {
        ...newCards[data.index],
        images: [...newCards[data.index].images, data.fileUrl.fileUrl], // 將新的圖片資料加入 images 陣列中
      };
      setEditorCards(newCards);
    }
  };

  // 個別刪除某張內文圖片
  const handleDeleteImage = (cardIndex: number, imageIndex: number) => {
    const newCards = [...editorCards];
    if (newCards[cardIndex]) {
      newCards[cardIndex].images = newCards[cardIndex].images.filter(
        (_, idx) => idx !== imageIndex
      );
      setEditorCards(newCards);
    }
  };

  const handleUpdate = async () => {
    setIsFinish(false);
    const input = {
      section1: {
        card: editorCards,
      },
      section2: {
        card: editorCards2,
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
        setIsFinish(true);
        alert("更新成功");
      }
    } catch (err) {
      console.error("更新失敗:", err);
    }
  };

  return (
    <div>
      <div className="text-32M mb-6">作品展示​</div>
      <div className="flex flex-col gap-[16px]">
        {/* 區塊一 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between">
            <div>作品展示</div>
            <Image
              src="/icons/24icon/arrow_right.svg"
              className={`cursor-pointer transition-transform duration-300 ${
                isOpen1 ? "rotate-90" : ""
              }`}
              width={24}
              height={24}
              alt="arrow"
              onClick={() => setIsOpen1(!isOpen1)}
            />
          </div>
          <div
            ref={contentRef1}
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height1}px` }}
          >
            <div className="my-3"></div>
            <div className="my-3">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={addCard}
              >
                新增卡片
              </button>
            </div>
            <div>
              {editorCards.map((card, index) => (
                <div key={index} className="my-3">
                  <div className="flex flex-col gap-3">
                    <div>
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          placeholder="標題"
                          value={card.title}
                          onChange={(e) =>
                            handleCardChange(index, "title", e.target.value)
                          }
                          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                        />
                        <textarea
                          type="text"
                          placeholder="詳細內文"
                          value={card.introduce}
                          onChange={(e) =>
                            handleCardChange(index, "introduce", e.target.value)
                          }
                          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                        />
                      </div>
                      <div className="flex space-x-3 mt-3">
                        <textarea
                          placeholder="內文"
                          value={card.content}
                          onChange={(e) =>
                            handleCardChange(index, "content", e.target.value)
                          }
                          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                        />
                        <textarea
                          placeholder="教材研發者"
                          value={card.developer}
                          onChange={(e) =>
                            handleCardChange(index, "developer", e.target.value)
                          }
                          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-6">
                      <div>
                        <div>封面圖片 目前上傳圖片:{card.imageSrc}</div>
                        <ImageUploader
                          onImageUpload={(filename) =>
                            handleImageUpload({ fileUrl: filename, index })
                          }
                        />
                      </div>
                      <div>
                        <div>內文圖片(複數) 目前上傳圖片:{card.images}</div>
                        <ImageUploader
                          onImageUpload={(filename) =>
                            handleImageUpload2({ fileUrl: filename, index })
                          }
                        />
                        {/* 顯示目前上傳圖片的列表，每筆僅顯示文字與刪除按鈕 */}
                        <div className="mt-2">
                          {card.images &&
                            card.images.map((img, imageIndex) => (
                              <div
                                key={imageIndex}
                                className="flex items-center gap-2"
                              >
                                <span>圖片{imageIndex + 1}</span>
                                <button
                                  className="bg-red-500 text-white px-3 py-1 rounded"
                                  onClick={() =>
                                    handleDeleteImage(index, imageIndex)
                                  }
                                >
                                  刪除
                                </button>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => DeleteCard(index)}
                    >
                      刪除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* 區塊二 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between items-center">
            <div>卓越的學習與教學​短講​流程 活動區域</div>
            <div className="flex items-center gap-2">
              <Image
                src="/icons/24icon/arrow_right.svg"
                className={`cursor-pointer transition-transform duration-300 ${
                  isOpen2 ? "rotate-90" : ""
                }`}
                width={24}
                height={24}
                alt="arrow"
                onClick={() => setIsOpen2(!isOpen2)}
              />
            </div>
          </div>
          <div
            ref={contentRef2}
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height2}px` }}
          >
            <div className="my-3 flex justify-between">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={addCard2}
              >
                新增卡片
              </button>
              <div>Select 按住 Ctrl 複選 </div>
            </div>
            <div>
              {editorCards2.map((card, index) => (
                <div key={index} className="my-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="日期 （格式：3.10)"
                      value={card.date}
                      onChange={(e) =>
                        handleCardChange2(index, "date", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
                    <div>
                      <div>{card.id}</div>
                      <select
                        multiple
                        onChange={(e) => {
                          const selectedValues = Array.from(
                            e.target.selectedOptions,
                            (option) => option.value
                          );
                          handleCardChange2(index, "id", selectedValues);
                        }}
                        className="block  rounded-md bg-white px-6 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                      >
                        {selectEvent.map((event, idx) => (
                          <option key={idx} value={event.id}>
                            {event.id} - {event.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => DeleteCard2(index)}
                    >
                      刪除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleUpdate}
          className={`bg-green-500 text-white px-4 py-2 rounded ${
            isFinish ? "" : "disabled bg-green-700"
          }`}
        >
          更新資料
        </button>
      </div>
    </div>
  );
};
