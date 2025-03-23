"use client";
import React, { useState } from "react";

// 1. 定義屬性型別
type TabProps = {
  titles: string[];
  dates?: string[]; // 改成可選屬性
  color?: string;
  onChange?: (index: number) => void; // 建議指定回傳參數型別
};

// 2. 在函式參數解構時標記型別
export const Tab = ({
  titles,
  dates,
  color = "text-secondary border-b-6 border-secondary",
  onChange,
}: TabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  // 處理點擊切換標籤
  const handleTabChange = (index: number) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <div className="w-fit mx-auto">
      <div className="flex border-b border-[#252F380D]">
        {titles.map((title, index) => (
          <button
            key={index}
            className={`flex-1 text-center pb-[8px] px-[32px] text-16M text-nowrap ${
              activeTab === index
                ? // 若要對第 0 個標籤做額外樣式處理
                  index === 0
                  ? "text-secondary border-b-6 border-secondary"
                  : color
                : "text-[#252F3866] border-b-6 border-[#252F380D]"
            }`}
            onClick={() => handleTabChange(index)}
          >
            {title}
            {/* 只有在 dates 有值，而且該索引位置有日期時，才顯示出來 */}
            {dates?.[index] && (
              <div className="text-16M font-NotoSansTC">{dates[index]}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
