"use client";
import { useState } from "react";

export const Tab = ({
  titles,
  dates,
  color = "text-secondary border-b-6 border-secondary",
  onChange, // 新增 onChange callback
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
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
            className={`flex-1 text-center pb-[8px] px-[32px] text-16M ${
              activeTab === index
                ? `${
                    index === 0
                      ? "text-secondary border-b-6 border-secondary"
                      : color
                  }`
                : "text-[#252F3866] border-b-6 border-[#252F380D]"
            }`}
            onClick={() => handleTabChange(index)}
          >
            {title}
            {dates?.[index] && (
              <div className="text-16M font-NotoSansTC">{dates[index]}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
