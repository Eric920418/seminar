"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export const Header = () => {
  const router = useRouter();
  const nav = [
    {
      title: "最新消息",
      path: "/",
      inSelect: [
        { title: "最新消息", smSelect: [{ title: "最新消息" }] },
        { title: "重要時程" },
        { title: "會議直播" },
        { title: "線上報名與規則" },
        { title: "交通" },
        { title: "住宿", smSelect: [{ title: "最新消息" }] },
        { title: "會議平面圖" },
      ],
    },
    {
      title: "ICTE​會議​資訊",
      path: "/meeting",
      inSelect: [
        { title: "最新消息", smSelect: [{ title: "最新消息" }] },
        { title: "重要時程" },
        { title: "會議直播" },
        { title: "線上報名與規則" },
        { title: "交通" },
        { title: "住宿" },
        { title: "會議平面圖" },
      ],
    },
    {
      title: "主​題演講",
      path: "/speech",
      inSelect: [
        { title: "最新消息", smSelect: [{ title: "最新消息" }] },
        { title: "重要時程" },
        { title: "會議直播" },
        { title: "線上報名與規則" },
        { title: "交通" },
        { title: "住宿" },
        { title: "會議平面圖" },
      ],
    },
    {
      title: "圓桌論壇",
      path: "/forum",
      inSelect: [
        { title: "最新消息", smSelect: [{ title: "最新消息" }] },
        { title: "重要時程" },
        { title: "會議直播" },
        { title: "線上報名與規則" },
        { title: "交通" },
        { title: "住宿" },
        { title: "會議平面圖" },
      ],
    },
    {
      title: "工作坊",
      path: "/work",
      inSelect: [
        { title: "最新消息", smSelect: [{ title: "最新消息" }] },
        { title: "重要時程" },
        { title: "會議直播" },
        { title: "線上報名與規則" },
        { title: "交通" },
        { title: "住宿" },
        { title: "會議平面圖" },
      ],
    },
    {
      title: "教學教具展​​​",
      path: "/exhibition",
      inSelect: [
        { title: "最新消息", smSelect: [{ title: "最新消息" }] },
        { title: "重要時程" },
        { title: "會議直播" },
        { title: "線上報名與規則" },
        { title: "交通" },
        { title: "住宿" },
        { title: "會議平面圖" },
      ],
    },
    {
      title: "ICTE論文",
      path: "/papers",
      inSelect: [
        { title: "最新消息", smSelect: [{ title: "最新消息" }] },
        { title: "重要時程" },
        { title: "會議直播" },
        { title: "線上報名與規則" },
        { title: "交通" },
        { title: "住宿" },
        { title: "會議平面圖" },
      ],
    },
    {
      title: "影片專區",
      path: "/video",
      inSelect: [
        { title: "最新消息", smSelect: [{ title: "最新消息" }] },
        { title: "重要時程" },
        { title: "會議直播" },
        { title: "線上報名與規則" },
        { title: "交通" },
        { title: "住宿" },
        { title: "會議平面圖" },
      ],
    },
  ];

  // openStates 為各選單開關狀態，預設全部關閉
  const [openStates, setOpenStates] = useState(nav.map(() => false));
  // smOpenStates 為各子選單開關狀態，預設全部關閉
  const [smOpenStates, setSmOpenStates] = useState(
    nav.map((item) => item.inSelect.map(() => false))
  );

  const toggleMenu = (navIndex) => {
    setOpenStates((prev) =>
      prev.map((state, i) => (i === navIndex ? !state : false))
    );
  };

  const toggleSmMenu = (navIndex, inSelectIndex) => {
    if (
      !nav[navIndex].inSelect[inSelectIndex].smSelect ||
      nav[navIndex].inSelect[inSelectIndex].smSelect.length === 0
    ) {
      return;
    }
    setSmOpenStates((prev) =>
      prev.map((item, i) =>
        i === navIndex
          ? item.map((state, j) => (j === inSelectIndex ? !state : false))
          : item
      )
    );
  };

  const closeAllMenus = () => {
    setOpenStates(nav.map(() => false));
    setSmOpenStates(nav.map((item) => item.inSelect.map(() => false)));
  };

  const handleNavigation = (path) => {
    if (path) {
      router.push(path);
    }
  };

  return (
    <div className="p-[32px] flex fixed top-0 w-full justify-between z-[100]">
      <div className="bg-[#FFFFFF80] w-[269px] h-[90px] rounded-[40px] "></div>
      <div className="bg-[#FFFFFF80] w-fit h-[90px] rounded-[40px] flex items-center space-x-[64px] px-[64px] ">
        {nav.map((navItem, navIndex) => (
          <div key={navIndex}>
            <div className="relative">
              <div
                className="text-16M text-black  text-nowrap cursor-pointer"
                onClick={() => handleNavigation(navItem.path)}
                onMouseEnter={() => toggleMenu(navIndex)}
              >
                {navItem.title}
              </div>
              <div
                className={`absolute left-1/2 transform -translate-x-1/2 top-16 w-fit bg-[#FFFFFFB2] rounded-[16px] p-[24px] flex flex-col gap-[16px] transition-all duration-300 ease-in-out ${
                  openStates[navIndex]
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                {navItem.inSelect.map((item, inSelectIndex) => (
                  <div key={inSelectIndex} className="relative">
                    <div
                      className="text-16M text-black text-nowrap  text-center cursor-pointer"
                      onClick={() => toggleSmMenu(navIndex, inSelectIndex)}
                    >
                      {item.title}
                    </div>
                    {item.smSelect && item.smSelect.length > 0 && (
                      <div
                        className={`absolute transform -translate-x-1/2 -translate-y-12 w-fit bg-[#FFFFFFB2] rounded-[16px] p-[24px] flex flex-col gap-[16px] transition-all duration-300 ease-in-out ${
                          smOpenStates[navIndex] &&
                          smOpenStates[navIndex][inSelectIndex]
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95 pointer-events-none"
                        } ${navIndex === 7 ? "right-22" : "left-50"}`}
                      >
                        {item.smSelect.map((subItem, subIndex) => (
                          <div
                            key={subIndex}
                            className="text-16M text-black text-nowrap  text-center"
                          >
                            {subItem.title}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
