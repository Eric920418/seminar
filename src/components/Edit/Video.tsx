"use client";
import { gql } from "graphql-tag";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ImageUploader } from "@/components/Admin/ImageUploader";
import { useSession } from "next-auth/react";
import { graphqlRequest } from "@/utils/graphqlClient";

const UPDATE_PAGE = gql`
  mutation UpdateVideoPage($input: UpdateVideoPageInput!) {
    updateVideoPage(input: $input) {
      section1
    }
  }
`;

const query = `
  query videoPage {
    videoPage {
      section1
    }
  }
`;

// 統一 UploadResponse 接口定義，與 ImageUploader 組件一致
interface UploadResponse {
  imageUrl: string;
}

interface CardType {
  title: string;
  content: string;
  videos: string;
}

interface UpdateVideoResult {
  updateVideoPage: {
    section1: {
      editorCards: CardType[];
    };
  };
  errors: {
    message: string;
  }[];
}

export const Video = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [height1, setHeight1] = useState(0);
  const contentRef1 = useRef<HTMLDivElement>(null);

  const [isOpen2, setIsOpen2] = useState(false);
  const [height2, setHeight2] = useState(0);
  const contentRef2 = useRef<HTMLDivElement>(null);

  const [isOpen3, setIsOpen3] = useState(false);
  const [height3, setHeight3] = useState(0);
  const contentRef3 = useRef<HTMLDivElement>(null);

  const [editorBackground, setEditorBackground] = useState("");

  const [editorVideoURL, setEditorVideoURL] = useState("");
  const [editorVideoURL2, setEditorVideoURL2] = useState("");
  // 為狀態數組添加正確的類型定義
  const [editorCards, setEditorCards] = useState<CardType[]>([]);
  const [editorCards2, setEditorCards2] = useState<CardType[]>([]);
  const [editorCards3, setEditorCards3] = useState<CardType[]>([]);

  useEffect(() => {
    if (contentRef3.current) {
      setHeight3(isOpen3 ? contentRef3.current.scrollHeight : 0);
    }
  }, [isOpen3, editorBackground]);

  useEffect(() => {
    if (contentRef1.current) {
      setHeight1(isOpen1 ? contentRef1.current.scrollHeight : 0);
    }
  }, [isOpen1, editorVideoURL, editorCards, editorVideoURL2, editorCards2]);

  useEffect(() => {
    if (contentRef2.current) {
      setHeight2(isOpen2 ? contentRef2.current.scrollHeight : 0);
    }
  }, [
    isOpen2,
    editorVideoURL2,
    editorCards2,
    editorVideoURL,
    editorCards,
    editorCards3,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      console.log(data);

      if (data.videoPage[0].section1) {
        setEditorCards(data.videoPage[0].section1.tab[0].card);
        setEditorCards2(data.videoPage[0].section1.tab[1].card);
        setEditorCards3(data.videoPage[0].section1.tab[2].card);
        setEditorVideoURL(data.videoPage[0].section1.tab[0].video);
        setEditorVideoURL2(data.videoPage[0].section1.tab[1].video);
      }
      setEditorBackground(data.videoPage[0].section1.background);
    };

    fetchData();
  }, []);

  const handleEditorVideoURL = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditorVideoURL(event.target.value);
  };
  const handleEditorVideoURL2 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditorVideoURL2(event.target.value);
  };

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
    setEditorCards([...editorCards, { title: "", content: "", videos: "" }]);
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
    setEditorCards2([...editorCards2, { title: "", content: "", videos: "" }]);
  };

  const DeleteCard2 = (index: number) => {
    const newCards = editorCards2.filter((_, idx) => idx !== index);
    setEditorCards2(newCards);
  };

  const addCard3 = () => {
    setEditorCards3([...editorCards3, { title: "", content: "", videos: "" }]);
  };

  const DeleteCard3 = (index: number) => {
    const newCards = editorCards3.filter((_, idx) => idx !== index);
    setEditorCards3(newCards);
  };

  // 修復 ImageUploader 回調函數，使用正確的 UploadResponse 類型
  const handleEditorBackground = (data: UploadResponse) => {
    setEditorBackground(data.imageUrl);
  };

  const handleCardChange3 = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    const newCards = [...editorCards3];
    newCards[index] = {
      ...newCards[index],
      [field]: value,
    };
    setEditorCards3(newCards);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const input = {
      section1: {
        tab: [
          {
            video: editorVideoURL,
            card: editorCards,
          },
          {
            video: editorVideoURL2,
            card: editorCards2,
          },
          {
            card: editorCards3,
          },
        ],
        background: editorBackground,
      },
    };

    try {
      const response = await graphqlRequest<UpdateVideoResult>(
        UPDATE_PAGE.loc?.source.body || "",
        { input },
        session
      );
      if (response.errors) {
        console.error("更新失敗:", JSON.stringify(response.errors, null, 2));
      }
    } catch (err) {
      console.error("更新失敗:", err);
    } finally {
      alert("更新成功");
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mb-3"></div>
            <p className="text-gray-700">資料處理中，請稍候...</p>
          </div>
        </div>
      )}
      <div className="text-32M mb-6">影片專區​​</div>
      <div className="flex flex-col gap-[16px]">
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between">
            <div>背景圖片</div>
            <Image
              src="/icons/24icon/arrow_right.svg"
              className={`cursor-pointer transition-transform duration-300 ${
                isOpen3 ? "rotate-90" : ""
              }`}
              width={24}
              height={24}
              alt="arrow"
              onClick={() => setIsOpen3(!isOpen3)}
            />
          </div>
          <div
            ref={contentRef3}
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height3}px` }}
          >
            <div className="w-full">
                          {editorBackground && typeof editorBackground === 'string' && editorBackground.trim() !== "" && (
              <Image
                src={editorBackground}
                alt="會議背景"
                width={100}
                height={100}
              />
            )}
            </div>
            <div className="w-full">
              <ImageUploader
                onImageUpload={handleEditorBackground}
              />
            </div>
          </div>
        </div>
        {/* 區塊一 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between">
            <div>師資培育國際學術研討會</div>
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
            <div className="my-3">
              <div className="my-3">ICTE直播</div>
              <input
                type="text"
                value={editorVideoURL}
                placeholder="ytube影片網址 ?v={這段}"
                onChange={handleEditorVideoURL}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
              />
            </div>
            <div className="my-3">
              <div className="my-3">ICTE宣傳短片</div>
              <input
                type="text"
                value={editorVideoURL2}
                placeholder="ytube影片網址 ?v={這段}"
                onChange={handleEditorVideoURL2}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
              />
            </div>
          </div>
        </div>
        {/* 區塊二 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between items-center">
            <div>卓越的學習與教學短講</div>
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
            <div className="my-3 flex space-x-6">
              <div>研討會主題演講​</div>
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
                  <div className="flex gap-3">
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
                      placeholder="內文"
                      value={card.content}
                      onChange={(e) =>
                        handleCardChange(index, "content", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
                    <input
                      type="text"
                      placeholder="ytube影片網址 ?v={這段}"
                      value={card.videos}
                      onChange={(e) =>
                        handleCardChange(index, "videos", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
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
            <div className="my-3 flex space-x-6">
              <div>領域教材教法教 學實踐計畫​</div>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={addCard2}
              >
                新增卡片
              </button>
            </div>
            <div>
              {editorCards2.map((card, index) => (
                <div key={index} className="my-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="標題"
                      value={card.title}
                      onChange={(e) =>
                        handleCardChange2(index, "title", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />

                    <textarea
                      placeholder="內文"
                      value={card.content}
                      onChange={(e) =>
                        handleCardChange2(index, "content", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
                    <input
                      type="text"
                      placeholder="ytube影片網址 ?v={這段}"
                      value={card.videos}
                      onChange={(e) =>
                        handleCardChange2(index, "videos", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
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
            <div className="my-3 flex space-x-6">
              <div>領域教材教法獲獎論文發表​</div>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={addCard3}
              >
                新增卡片
              </button>
            </div>
            <div>
              {editorCards3.map((card, index) => (
                <div key={index} className="my-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="標題"
                      value={card.title}
                      onChange={(e) =>
                        handleCardChange3(index, "title", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
                    <textarea
                      placeholder="內文"
                      value={card.content}
                      onChange={(e) =>
                        handleCardChange3(index, "content", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
                    <input
                      type="text"
                      placeholder="ytube影片網址 ?v={這段}"
                      value={card.videos}
                      onChange={(e) =>
                        handleCardChange3(index, "videos", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => DeleteCard3(index)}
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
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          更新資料
        </button>
      </div>
    </div>
  );
};
