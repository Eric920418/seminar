import Image from "next/image";
export const Footer = () => {
  const nav = [
    {
      title: "最新消息",
      inSelect: [
        { title: "重要時程" },
        { title: "手冊完整版" },
        { title: "會後影片" },
        { title: "會議組成" },
      ],
    },
    {
      title: "ICTE​會議​資訊",
      inSelect: [
        { title: "最新消息" },
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
      inSelect: [],
    },
    {
      title: "圓桌論壇",
      inSelect: [],
    },
    {
      title: "工作坊",
      inSelect: [],
    },
    {
      title: "教學教具展​​​",
      inSelect: [
        { title: "作品展示" },
        { title: "卓越的學習與教學​短講​流程" },
      ],
    },
    {
      title: "ICTE論文",
      inSelect: [
        { title: "論文摘要審查結果公告" },
        { title: "徵文主題與論文格式" },
        { title: "海報發表場次" },
        { title: "口頭發表場次" },
        { title: "論文發表規則" },
      ],
    },
    {
      title: "影片專區",
      inSelect: [],
    },
  ];
  return (
    <div className="bg-[#6EC7B9] p-[32px] laptop:p-[64px] desktop:p-[128px]">
      <div className="flex justify-between ">
        <div className="bg-[#FFFFFF80] desktop:w-[205px] h-[64px] rounded-[40px] "></div>
        <div className="flex space-x-[56px] overflow-x-scroll">
          {nav.map((item, index) => (
            <div key={index}>
              <div className="text-white text-20M  text-nowrap">
                {item.title}
              </div>
              <div className="mt-[16px] flex flex-col gap-[8px]">
                {item.inSelect.map((item, index) => (
                  <div key={index} className="text-white text-16M  text-nowrap">
                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[128px] flex justify-between desktop:py-[10px] overflow-auto">
        <div className="text-white text-14R ">
          Copyright © 2025 第12屆師資培育國際學術研討會 保留一切權利。
        </div>
        <div className="flex space-x-[8px]">
          <Image
            className="text-white"
            src="/icons/24icon/fb.svg"
            width={40}
            height={40}
            alt="fb"
          />
          <Image
            className="text-white"
            src="/icons/24icon/ig.svg"
            width={40}
            height={40}
            alt="fb"
          />
          <Image
            className="text-white"
            src="/icons/24icon/yt.svg"
            width={40}
            height={40}
            alt="fb"
          />
        </div>
      </div>
    </div>
  );
};
