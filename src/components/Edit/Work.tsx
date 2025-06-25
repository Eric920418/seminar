"use client";
import { gql } from "graphql-tag";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ImageUploader } from "@/components/Admin/ImageUploader";
import { useSession } from "next-auth/react";
import { graphqlRequest } from "@/utils/graphqlClient";

const UPDATE_PAGE = gql`
  mutation UpdateWorkShopPage($input: UpdateWorkShopPageInput!) {
    updateWorkShopPage(input: $input) {
      section1
      section2
    }
  }
`;

const query = `
  query workShopPage {
    workShopPage {
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

// 統一 UploadResponse 接口定義，與 ImageUploader 組件一致
interface UploadResponse {
  imageUrl: string;
}

interface CardType {
  title: string;
  id: string;
}

// 新增事件選擇類型定義
interface SelectEventType {
  title: string;
  id: string;
}

// 新增工作坊卡片類型定義
interface WorkshopCardType {
  date: string;
  id: string | string[];
}

interface UpdateWorkResult {
  updateWorkShopPage: {
    section1: {
      editorCards: CardType[];
    };
  };
  errors: {
    message: string;
  }[];
}

export const Work = () => {
  const { data: session } = useSession();
  const [isOpen1, setIsOpen1] = useState(false);
  const [height1, setHeight1] = useState(0);
  const contentRef1 = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [height2, setHeight2] = useState(0);
  const contentRef2 = useRef<HTMLDivElement>(null);

  const [editorContents, setEditorContents] = useState({
    editor1: "",
    editor2: "",
  });
  // 為狀態數組添加正確的類型定義
  const [editorCards2, setEditorCards2] = useState<WorkshopCardType[]>([]);
  const [editorBackground, setEditorBackground] = useState("");
  const [selectEvent, setSelectEvent] = useState<SelectEventType[]>([]);
  useEffect(() => {
    if (contentRef1.current) {
      setHeight1(isOpen1 ? contentRef1.current.scrollHeight : 0);
    }
  }, [isOpen1, editorBackground]);

  useEffect(() => {
    if (contentRef2.current) {
      setHeight2(isOpen2 ? contentRef2.current.scrollHeight : 0);
    }
  }, [isOpen2, editorCards2]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      setEditorContents({
        editor1: data.workShopPage[0].section1.dateLabel1,
        editor2: data.workShopPage[0].section1.dateLabel2,
      });
      setEditorBackground(data.workShopPage[0].section1.background);
      setEditorCards2(data.workShopPage[0].section2.card);
    };

    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query2,
        }),
      });
      const { data } = await res.json();
      setSelectEvent((prevEvents) => {
        // 取得前一次的狀態，然後新增新的資料
        const events = [...prevEvents];
        data.event[0].section1.editorCards.forEach((card: any) => {
          events.push({
            title: card.title2,
            id: card.id,
          });
        });
        return events;
      });
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // const handleEditorChange = (id: string, content: string) => {
  //   setEditorContents((prev) => ({
  //     ...prev,
  //     [id]: content,
  //   }));
  // };

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

  // 修復 ImageUploader 回調函數，使用正確的 UploadResponse 類型
  const handleEditorBackground = (data: UploadResponse) => {
    setEditorBackground(data.imageUrl);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const input = {
      section1: {
        dateLabel1: editorContents.editor1,
        dateLabel2: editorContents.editor2,
        background: editorBackground,
      },
      section2: {
        card: editorCards2,
      },
    };

    try {
      const response = await graphqlRequest<UpdateWorkResult>(
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

      <div className="text-32M mb-6">微型工作坊​​​</div>
      <div className="flex flex-col gap-[16px]">
        {/* 區塊一 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between">
            <div>背景圖片</div>
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
        {/* 區塊二 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between items-center">
            <div>活動區域</div>
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
          className={`bg-green-500 text-white px-4 py-2 rounded`}
        >
          更新資料
        </button>
      </div>
    </div>
  );
};
