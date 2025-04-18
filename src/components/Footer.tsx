"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const query = `
  query logo {
    logo {
      section1
    }
  }
`;
export const Footer = () => {
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
        { title: "緣起", path: "/meeting", index: 0 },
        { title: "目的", path: "/meeting", index: 1 },
        { title: "活動類型", path: "/meeting", index: 2 },
        { title: "會議議程", path: "/meeting", index: 3 },
        { title: "重要時刻", path: "/meeting", index: 4 },
        { title: "發表規則", path: "/meeting", index: 5 },
        { title: "線上報名規則", path: "/meeting", index: 6 },
        { title: "交通", path: "/meeting", index: 7 },
        { title: "住宿", path: "/meeting", index: 8 },
        { title: "會議平面圖", path: "/meeting", index: 9 },
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
      title: "微型工作坊",
      path: "/work",
      inSelect: [],
    },
    {
      title: "創新教材教具展​",
      path: "/exhibition",
      inSelect: [{ title: "作品展示", path: "/exhibition", index: 0 }],
    },
    {
      title: "ICTE論文",
      path: "/papers",
      inSelect: [
        { title: "徵文主題與論文格式", path: "/papers", index: 0 },
        {
          title: "論文摘要審查結果公告",
          path: "/papers",
          index: 1,
        },
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

  const [editorFooter, setEditorFooter] = useState({
    editor1: "",
    editor2: "",
    editor3: "",
    editor4: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      setEditorFooter({
        editor1: data.logo[0].section1?.footer.editor1,
        editor2: data.logo[0].section1?.footer.editor2,
        editor3: data.logo[0].section1?.footer.editor3,
        editor4: data.logo[0].section1?.footer.editor4,
      });
    };

    fetchData();
  }, []);

  const handleNavigation = (path) => {
    if (path) {
      router.push(path.path);
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

  return (
    <div className="bg-[#6EC7B9] p-[16px] laptop:p-[64px] desktop:p-[128px]">
      <div className="flex justify-between ">
        <div className="flex gap-[56px] flex-wrap ">
          {nav.map((item, index) => (
            <div key={index}>
              <div
                className="text-white text-20M  text-nowrap "
                onClick={() => handleNavigation(item)}
              >
                {item.title}
              </div>
              <div className="mt-[16px] flex flex-col gap-[8px]">
                {item.inSelect.map((item, index) => (
                  <div
                    key={index}
                    className="text-white text-16M  text-nowrap"
                    onClick={() => handleNavigation2(item)}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[64px] desktop:mt-[128px] desktop:flex justify-between desktop:py-[10px] overflow-auto">
        <div className="text-white text-[12px]  desktop:text-14R ">
          {editorFooter.editor1}
        </div>
        <div className="flex justify-center desktop:justify-start space-x-[8px]">
          <a
            href={editorFooter.editor2}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[40px] h-[40px] flex items-center justify-center"
          >
            <Image
              className="text-white"
              src="/icons/24icon/fb.svg"
              width={40}
              height={40}
              alt="Facebook"
              style={{ width: "40px", height: "40px" }}
              priority
            />
          </a>

          <a
            href={editorFooter.editor3}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[40px] h-[40px] flex items-center justify-center"
          >
            <Image
              className="text-white"
              src="/icons/24icon/ig.svg"
              width={40}
              height={40}
              alt="Instagram"
              style={{ width: "40px", height: "40px" }}
              priority
            />
          </a>
          <a
            href={editorFooter.editor4}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[40px] h-[40px] flex items-center justify-center"
          >
            <Image
              className="text-white"
              src="/icons/24icon/yt.svg"
              width={40}
              height={40}
              alt="YouTube"
              style={{ width: "40px", height: "40px" }}
              priority
            />
          </a>
        </div>
      </div>
    </div>
  );
};
