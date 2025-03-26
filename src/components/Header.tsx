"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
const query = `
  query logo {
    logo {
      section1
    }
  }
`;
export const Header = () => {
  const router = useRouter();
  const nav = [
    {
      title: "最新消息",
      path: "/",
      inSelect: [
        // { title: "重要時程" },
        // { title: "手冊完整版" },
        // { title: "會後影片" },
        // { title: "會議組成", smSelect: [{ title: "最新消息" }] },
      ],
    },
    {
      title: "ICTE​會議​資訊",
      path: "/meeting",
      inSelect: [
        { title: "會議議程", path: "/meeting", index: 0 },
        { title: "重要時刻", path: "/meeting", index: 1 },
        { title: "發表規則", path: "/meeting", index: 2 },
        { title: "線上報名規則", path: "/meeting", index: 3 },
        { title: "交通", path: "/meeting", index: 4 },
        { title: "住宿", path: "/meeting", index: 5 },
        { title: "會議平面圖", path: "/meeting", index: 6 },
      ],
    },
    {
      title: "主​題演講",
      path: "/speech",
      inSelect: [],
    },
    {
      title: "圓桌論壇",
      path: "/forum",
      inSelect: [],
    },
    {
      title: "工作坊",
      path: "/work",
      inSelect: [],
    },
    {
      title: "教學教具展​​​",
      path: "/exhibition",
      inSelect: [
        { title: "作品展示", path: "/exhibition", index: 0 },
        { title: "卓越的學習與教學​短講​流程", path: "/exhibition", index: 1 },
      ],
    },
    {
      title: "ICTE論文",
      path: "/papers",
      inSelect: [
        { title: "論文摘要審查結果公告", path: "/papers", index: 0 },
        { title: "徵文主題與論文格式", path: "/papers", index: 1 },
        { title: "口頭發表場次", path: "/papers", index: 2 },
        { title: "海報發表場次", path: "/papers", index: 3 },
      ],
    },
    {
      title: "影片專區",
      path: "/video",
      inSelect: [],
    },
  ];

  const [editorMapImage, setEditorMapImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      setEditorMapImage(data.logo[0].section1?.image);
    };

    fetchData();
  }, []);
  // 電腦版狀態
  const [openStates, setOpenStates] = useState(nav.map(() => false));
  const [smOpenStates, setSmOpenStates] = useState(
    nav.map((item) => item.inSelect.map(() => false))
  );
  const closeTimer = useRef(null);

  const toggleMenu = (navIndex) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    setOpenStates((prev) =>
      prev.map((state, i) => (i === navIndex ? true : false))
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
          ? item.map((state, j) => (j === inSelectIndex ? true : false))
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

  const handleNavigation2 = (path) => {
    if (path) {
      // 檢查是否為完整 URL
      if (path.path.startsWith("http://") || path.path.startsWith("https://")) {
        window.location.href = path.path;
        return;
      }
      // 內部路由跳轉,保持完整的 URL 結構
      const baseUrl = window.location.origin;
      const targetUrl = `${baseUrl}/${path.path}/${path.index}`;
      window.location.href = targetUrl;
    }
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => {
      closeAllMenus();
    }, 200);
  };

  const handleMouseEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
  };

  // 手機版狀態與函式
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState(nav.map(() => false));
  const [mobileSmSubMenu, setMobileSmSubMenu] = useState(
    nav.map((item) => item.inSelect.map(() => false))
  );

  const toggleMobileSubMenu = (navIndex) => {
    setMobileSubMenu((prev) =>
      prev.map((state, i) => (i === navIndex ? !state : state))
    );
  };

  const toggleMobileSmSubMenu = (navIndex, inSelectIndex) => {
    if (
      !nav[navIndex].inSelect[inSelectIndex].smSelect ||
      nav[navIndex].inSelect[inSelectIndex].smSelect.length === 0
    ) {
      return;
    }
    setMobileSmSubMenu((prev) =>
      prev.map((item, i) =>
        i === navIndex
          ? item.map((state, j) => (j === inSelectIndex ? !state : state))
          : item
      )
    );
  };

  return (
    <>
      {/* 電腦版 Header */}
      <div className="hidden laptop:flex p-[32px] fixed top-0 w-screen justify-between z-[20]">
        <div className="bg-[#FFFFFF80] w-[0px] h-[70px] laptop:w-[200px] laptop:h-[80px] desktop:w-[269px] desktop:h-[90px] rounded-[40px] flex items-center justify-center">
          <div className="h-[45px] w-[200px] ">
            <Link href="/">
              {editorMapImage && (
                <Image
                  src={editorMapImage}
                  alt="logo"
                  width={269}
                  height={90}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                  className="w-full h-full object-cover"
                />
              )}
            </Link>
          </div>
        </div>

        <div className="bg-[#FFFFFF80] rounded-[40px] flex items-center space-x-[64px] px-[64px]">
          {nav.map((navItem, navIndex) => (
            <div
              key={navIndex}
              className="h-full w-full flex items-center relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative">
                <div
                  className="text-16M text-black text-nowrap cursor-pointer"
                  onClick={() => handleNavigation(navItem.path)}
                  onMouseEnter={() => toggleMenu(navIndex)}
                >
                  {navItem.title}
                </div>
                {navItem.inSelect && navItem.inSelect.length > 0 && (
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 top-16 w-fit bg-[#FFFFFFB2] rounded-[16px] p-[24px] flex flex-col gap-[16px] transition-all duration-300 ease-in-out ${
                      openStates[navIndex]
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    {navItem.inSelect.map((item, inSelectIndex) => (
                      <div
                        key={inSelectIndex}
                        className="relative"
                        onMouseEnter={() => {
                          toggleMenu(navIndex);
                          toggleSmMenu(navIndex, inSelectIndex);
                        }}
                        onClick={() => handleNavigation2(item)}
                      >
                        <div className="text-16M text-black text-nowrap text-center cursor-pointer">
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
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            {item.smSelect.map((subItem, subIndex) => (
                              <div
                                key={subIndex}
                                className="text-16M text-black text-nowrap text-center"
                              >
                                {subItem.title}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 手機版 Header */}
      <div className="laptop:hidden fixed top-0 left-0 w-full z-[30] bg-yellow-50 shadow-md">
        <div className="flex items-center justify-between p-4">
          <div className="h-[45px] w-[200px]">
            {editorMapImage && (
              <Image
                src={editorMapImage}
                alt="logo"
                width={269}
                height={90}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-gray-200">
            {nav.map((navItem, navIndex) => (
              <div key={navIndex} className="border-b border-gray-200">
                <div className="flex justify-between items-center p-4">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      handleNavigation(navItem.path);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {navItem.title}
                  </span>
                  {navItem.inSelect && navItem.inSelect.length > 0 && (
                    <button onClick={() => toggleMobileSubMenu(navIndex)}>
                      {mobileSubMenu[navIndex] ? "-" : "+"}
                    </button>
                  )}
                </div>
                {mobileSubMenu[navIndex] && (
                  <div className="pl-4">
                    {navItem.inSelect.map((item, inSelectIndex) => (
                      <div
                        key={inSelectIndex}
                        className="border-b border-gray-100"
                      >
                        <div className="flex justify-between items-center p-4">
                          <span
                            className="cursor-pointer"
                            onClick={() => handleNavigation2(item)}
                          >
                            {item.title}
                          </span>
                          {item.smSelect && item.smSelect.length > 0 && (
                            <button
                              onClick={() =>
                                toggleMobileSmSubMenu(navIndex, inSelectIndex)
                              }
                            >
                              {mobileSmSubMenu[navIndex] &&
                              mobileSmSubMenu[navIndex][inSelectIndex]
                                ? "-"
                                : "+"}
                            </button>
                          )}
                        </div>
                        {item.smSelect &&
                          item.smSelect.length > 0 &&
                          mobileSmSubMenu[navIndex] &&
                          mobileSmSubMenu[navIndex][inSelectIndex] && (
                            <div className="pl-4">
                              {item.smSelect.map((subItem, subIndex) => (
                                <div
                                  key={subIndex}
                                  className="p-4 border-b border-gray-50"
                                >
                                  <span
                                    className="cursor-pointer"
                                    onClick={() => {
                                      // 可在此加入路由或其他行為
                                    }}
                                  >
                                    {subItem.title}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
