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

      setEditorMapImage(data.logo[0].section1?.image);
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
      const targetUrl = `/${path.path}/${path.index}`; // 移除 localhost:3000
      window.location.href = targetUrl;
    }
  };

  return (
    <div className="bg-[#6EC7B9] p-[16px] laptop:p-[64px] desktop:p-[128px]">
      <div className="flex justify-between ">
        <div className="flex space-x-[56px] overflow-x-scroll">
          {nav.map((item, index) => (
            <div key={index}>
              <div
                className="text-white text-20M  text-nowrap"
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
          >
            <Image
              className="text-white"
              src="/icons/24icon/fb.svg"
              width={40}
              height={40}
              alt="Facebook"
            />
          </a>

          <a
            href={editorFooter.editor3}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="text-white"
              src="/icons/24icon/ig.svg"
              width={40}
              height={40}
              alt="fb"
            />
          </a>
          <a
            href={editorFooter.editor4}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="text-white"
              src="/icons/24icon/yt.svg"
              width={40}
              height={40}
              alt="fb"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
