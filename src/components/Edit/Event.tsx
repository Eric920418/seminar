"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { gql } from "graphql-tag";
import Image from "next/image";

const UPDATE_PAGE = gql`
  mutation updateEvent($input: UpdateEventInput!) {
    updateEvent(input: $input) {
      section1
    }
  }
`;
const query = `
  query event {
    event {
      section1
    }
  }
`;

const query2 = `
  query host {
    host {
      section1
    }
  }
`;

interface CardProps {
  card: any; // 建議使用更具體的型別來取代 any
  index: number;
  onToggle: (index: number) => void;
  onCardChange: (index: number, field: string, value: any) => void;
}

interface CardType {
  id: string;
  date: string;
  title: string;
  title2: string;
  content: string;
  time: string;
  time2: string;
  week: string;
  location: string;
  host: string;
  person: string;
  abstract: string;
  keywords: string;
  people: string[];
  isOpen: boolean;
}

// 單一卡片元件
const Card = ({ card, index, onToggle, onCardChange }: CardProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [selectHost, setSelectHost] = useState<{ name: string }[]>([]);
  // 用來暫存下拉選單目前選取的與談人
  const [selectedPersonToAdd, setSelectedPersonToAdd] = useState("");

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [card.isOpen]);

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
      setSelectHost((prevHosts) => {
        const newHosts = data.host[0].section1.editorCards.map(
          (hostCard: { name: string }) => ({
            name: hostCard.name,
          })
        );
        return [...prevHosts, ...newHosts];
      });
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 移動與談人順序的函式：direction 為 -1 (上移) 或 1 (下移)
  const movePerson = (idx: number, direction: number) => {
    const newPeople = [...card.people];
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= newPeople.length) return;
    [newPeople[idx], newPeople[targetIdx]] = [
      newPeople[targetIdx],
      newPeople[idx],
    ];
    onCardChange(index, "people", newPeople);
  };

  // 刪除某一位與談人
  const removePerson = (idx: number) => {
    const newPeople = card.people.filter((_, i) => i !== idx);
    onCardChange(index, "people", newPeople);
  };

  // 新增與談人 (避免重複新增)
  const addPerson = () => {
    if (selectedPersonToAdd && !card.people.includes(selectedPersonToAdd)) {
      onCardChange(index, "people", [...card.people, selectedPersonToAdd]);
      setSelectedPersonToAdd("");
    }
  };

  return (
    <div className="bg-gray-200 p-6 rounded-xl flex-1">
      <div className="flex justify-between mb-2">
        <div className="text-20M">
          {card.id}&nbsp;-&nbsp;{card.title2}
        </div>
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
        {/* 卡片內容範例 */}
        <div className="max-w-[1200px] mt-[32px] w-fit h-fit mx-auto p-[48px] bg-white rounded-[40px]">
          <div className="flex space-x-[64px]">
            <div className="bg-[#FFFBEE] p-[24px] rounded-[24px] flex flex-col items-center max-h-[272px]">
              <div className="text-black text-32M">{card.time}</div>
              <div className="w-[1px] h-[39px] bg-[#252F3880] my-[16px]"></div>
              <div className="text-black text-32M">{card.time2}</div>
              <div className="bg-[#FFEFB0] p-[8px_24px_8px_24px] rounded-[16px] mt-[24px]">
                <div className="text-black text-20M text-nowrap">
                  {card.week}
                </div>
              </div>
            </div>
            <div className="max-w-[900px] w-fit">
              <div className="text-secondary text-32M">{card.title}​</div>
              <div className="mt-[16px] text-black text-32M">{card.title2}</div>
              <div className="mt-[8px] text-black text-16M">{card.content}</div>
              <div className="border my-[32px] border-[#252F381A]"></div>
              <div className="flex space-x-[64px]">
                <div>
                  <div className="text-[#252F3880] text-14R">時間</div>
                  <div className="mt-[8px] text-secondary text-16M text-nowrap">
                    {card.time} - {card.time2}
                  </div>
                </div>
                <div className="w-[2px] h-[54px] bg-[#252F381A]"></div>
                <div>
                  <div className="text-[#252F3880] text-14R">地點</div>
                  <div className="mt-[8px] text-black text-16M text-nowrap">
                    {card.location}
                  </div>
                </div>
                <div className="w-[2px] h-[54px] bg-[#252F381A]"></div>
                <div>
                  <div className="text-[#252F3880] text-14R">主持人</div>
                  <div
                    className="mt-[8px] text-black text-16M"
                    dangerouslySetInnerHTML={{
                      __html: card.host.replace(/\n/g, "<br>"),
                    }}
                  ></div>
                </div>
              </div>
              <div className="border my-[32px] border-[#252F381A]"></div>
              <div>
                <div className="text-[#252F3880] text-14R">與談人</div>
                <div
                  className="mt-[8px] text-black text-16M"
                  dangerouslySetInnerHTML={{
                    __html: card.person.replace(/\n/g, "<br>"),
                  }}
                ></div>
              </div>
              <div className="border my-[32px] border-[#252F381A]"></div>
              <div>
                <div className="text-[#252F3880] text-14R">摘要</div>
                <div className="mt-[8px] text-black text-16M">
                  {card.abstract}
                </div>
              </div>
              <div className="border my-[32px] border-[#252F381A]"></div>
              <div>
                <div className="text-[#252F3880] text-14R">關鍵字</div>
                <div className="mt-[8px] text-black text-16M">
                  {card.keywords}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 編輯欄位 */}
        <div className="mt-[32px] min-h-[500px]">
          <input
            type="text"
            placeholder="日期 (格式：3.10)"
            value={card.date}
            onChange={(e) => onCardChange(index, "date", e.target.value)}
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
          />
          <div className="flex py-2 space-x-3">
            <input
              type="text"
              placeholder="標題"
              value={card.title}
              onChange={(e) => onCardChange(index, "title", e.target.value)}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
            />
            <input
              type="text"
              placeholder="標題2"
              value={card.title2}
              onChange={(e) => onCardChange(index, "title2", e.target.value)}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
            />
          </div>
          <input
            type="text"
            placeholder="內容"
            value={card.content}
            onChange={(e) => onCardChange(index, "content", e.target.value)}
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
          />
          <div className="flex py-2 space-x-3">
            <input
              type="text"
              placeholder="時間1"
              value={card.time}
              onChange={(e) => onCardChange(index, "time", e.target.value)}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
            />
            <input
              type="text"
              placeholder="時間2"
              value={card.time2}
              onChange={(e) => onCardChange(index, "time2", e.target.value)}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
            />
            <input
              type="text"
              placeholder="星期"
              value={card.week}
              onChange={(e) => onCardChange(index, "week", e.target.value)}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
            />
          </div>
          <input
            type="text"
            placeholder="地點"
            value={card.location}
            onChange={(e) => onCardChange(index, "location", e.target.value)}
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
          />
          <div className="flex pt-2 space-x-3">
            <textarea
              placeholder="主持人"
              value={card.host}
              onChange={(e) => onCardChange(index, "host", e.target.value)}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
            />
            <textarea
              placeholder="與談人"
              value={card.person}
              onChange={(e) => onCardChange(index, "person", e.target.value)}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
            />
          </div>
          <div className="flex py-2 space-x-3">
            <input
              type="text"
              placeholder="摘要"
              value={card.abstract}
              onChange={(e) => onCardChange(index, "abstract", e.target.value)}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
            />
            <input
              type="text"
              placeholder="關鍵字"
              value={card.keywords}
              onChange={(e) => onCardChange(index, "keywords", e.target.value)}
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
            />
          </div>

          {/* 與談人順序編輯區 */}
          <div className="py-2">編輯與談人順序</div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedPersonToAdd}
              onChange={(e) => setSelectedPersonToAdd(e.target.value)}
              className="block rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
            >
              <option value="">請選擇一個與談人</option>
              {selectHost.map((host, idx) => (
                <option key={idx} value={host.name}>
                  {host.name}
                </option>
              ))}
            </select>
            <button
              onClick={addPerson}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              新增
            </button>
          </div>
          {card.people && card.people.length > 0 && (
            <ul className="mt-2">
              {card.people.map((person: string, idx: number) => (
                <li key={idx} className="flex items-center space-x-2 space-y-2">
                  <span>{person}</span>
                  <button
                    onClick={() => movePerson(idx, -1)}
                    disabled={idx === 0}
                    className="bg-gray-300 text-black px-2 py-1 rounded"
                  >
                    上移
                  </button>
                  <button
                    onClick={() => movePerson(idx, 1)}
                    disabled={idx === card.people.length - 1}
                    className="bg-gray-300 text-black px-2 py-1 rounded"
                  >
                    下移
                  </button>
                  <button
                    onClick={() => removePerson(idx)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    刪除
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

// 主元件
export const Event = () => {
  // 將每張卡片初始資料包含 isOpen 屬性
  const [editorCards, setEditorCards] = useState<CardType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      setEditorCards(data.event[0].section1.editorCards);
    };

    fetchData();
  }, []);

  // 處理卡片內容欄位更新
  const handleCardChange = (index: number, field: string, value: any) => {
    const newCards = [...editorCards];
    newCards[index] = { ...newCards[index], [field]: value };
    setEditorCards(newCards);
  };

  // 處理卡片展開／收合
  const handleToggle = (index: number) => {
    const newCards = [...editorCards];
    newCards[index].isOpen = !newCards[index].isOpen;
    setEditorCards(newCards);
  };

  const addCard = () => {
    setEditorCards([
      ...editorCards,
      {
        id: Math.floor(100000 + Math.random() * 900000).toString(),
        date: "",
        title: "",
        title2: "",
        content: "",
        time: "",
        time2: "",
        week: "",
        location: "",
        host: "",
        person: "",
        abstract: "",
        keywords: "",
        people: [],
        isOpen: false, // 初始狀態為收合
      },
    ]);
  };

  const DeleteCard = (index: number) => {
    const newCards = editorCards.filter((_, idx) => idx !== index);
    setEditorCards(newCards);
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
        <div className="text-32M mb-6">活動</div>
        <button
          className="bg-blue-500 text-white px-2 rounded"
          onClick={addCard}
        >
          新增活動
        </button>
      </div>
      <div className="flex flex-col gap-[16px] mt-3">
        {editorCards.map((card, index) => (
          <div className="flex space-x-6" key={index}>
            <Card
              card={card}
              index={index}
              onToggle={handleToggle}
              onCardChange={handleCardChange}
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
