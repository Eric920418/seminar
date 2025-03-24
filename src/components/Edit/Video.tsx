"use client";
import { gql } from "graphql-tag";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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

export const Video = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [height1, setHeight1] = useState(0);
  const contentRef1 = useRef<HTMLDivElement>(null);

  const [isOpen2, setIsOpen2] = useState(false);
  const [height2, setHeight2] = useState(0);
  const contentRef2 = useRef<HTMLDivElement>(null);

  const [editorVideoURL, setEditorVideoURL] = useState("");
  const [editorVideoURL2, setEditorVideoURL2] = useState("");
  const [editorCards, setEditorCards] = useState([]);
  const [editorCards2, setEditorCards2] = useState([]);

  useEffect(() => {
    if (contentRef1.current) {
      setHeight1(isOpen1 ? contentRef1.current.scrollHeight : 0);
    }
  }, [isOpen1, editorVideoURL, editorCards]);

  useEffect(() => {
    if (contentRef2.current) {
      setHeight2(isOpen2 ? contentRef2.current.scrollHeight : 0);
    }
  }, [isOpen2, editorVideoURL2, editorCards2]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      console.log(data);

      if (data.videoPage[0].section1) {
        setEditorCards(data.videoPage[0].section1.tab[0].card);
        setEditorCards2(data.videoPage[0].section1.tab[1].card);
        setEditorVideoURL(data.videoPage[0].section1.tab[0].video);
        setEditorVideoURL2(data.videoPage[0].section1.tab[1].video);
      }
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

  const handleUpdate = async () => {
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
        ],
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
      <div className="text-32M mb-6">影片專區​​</div>
      <div className="flex flex-col gap-[16px]">
        {/* 區塊一 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between">
            <div>區塊一</div>
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
            <div>區塊二</div>
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
              <div>主題演講​</div>
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
              <div>圓桌論壇​</div>
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
