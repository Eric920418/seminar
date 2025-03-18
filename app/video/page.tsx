"use client";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Tab } from "@/components/Tab";
import { Button } from "@/components/Button";
import { VideoPlayer } from "@/components/Video/VideoPlayer";

import { useModalContext } from "@/components/ModalContext";
export default function Page() {
  const card = [
    {
      title:
        "教育應該不一樣從全球化到在地化：跨文化與國際視野下的師﻿資培育策略與挑戰",
      content: " ​​​楊志敏副教授｜國立屏東大學 師資培育中心",
      src: "/test.mp4",
    },
    {
      title: "Keynote Speech II",
      content:
        "探討多元性別概念，擴展編審視野與深化知能～2024年審定本教科用書第4次專題研習",
      src: "/test.mp4",
    },
    {
      title:
        "教育應該不一樣從全球化到在地化：跨文化與國際視野下的師﻿資培育策略與挑戰",
      content: " ​​​楊志敏副教授｜國立屏東大學 師資培育中心",
      src: "/test.mp4",
    },
    {
      title:
        "教育應該不一樣從全球化到在地化：跨文化與國際視野下的師﻿資培育策略與挑戰",
      content: " ​​​楊志敏副教授｜國立屏東大學 師資培育中心",
      src: "/test.mp4",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState({
    src: "",
    title: "",
    content: "",
  });

  const { setModalOpen } = useModalContext();
  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setModalOpen(true);
    } else {
      document.body.style.overflow = "";
      setModalOpen(false);
    }
    return () => {
      document.body.style.overflow = "";
      setModalOpen(false);
    };
  }, [isOpen, setModalOpen]);
  const openModal = (video) => {
    event.preventDefault();
    setCurrentVideo(video);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentVideo({
      src: "",
      title: "",
      content: "",
    });
  };

  return (
    <div className="bg-[#FAFBFD]">
      <div
        className="h-[640px] flex justify-center items-center"
        style={{
          backgroundImage: "url('/banner/Group.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center">
          <div className="text-third text-16M ">Workshop​​</div>
          <div className="text-black text-48M ">影片專區​​​</div>
        </div>
      </div>
      <div className="mx-auto w-fit pt-[128px] pb-[160px] max-w-[1200px]">
        <div>
          <div className="text-16M text-primary text-center">
            Abstract Review Results
          </div>
          <div className="relative w-fit mx-auto">
            <div className="text-black text-48M  relative z-10">
              第十二屆師資培育國際學術研討會
            </div>
            <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
          </div>
          <div className="mt-[128px]">
            <Tab titles={["ICTE直播", "ICTE宣傳短片"]} />
            <div className="mt-[64px] w-fit mx-auto">
              <div className="text-secondary text-36M ">ICTE ​活動現場直播</div>
              <div className="mt-[8px] text-[#00878580] text-20M  text-center">
                Live Seminar Broadcast
              </div>
            </div>
            <div className="mt-[64px]">
              <VideoPlayer src="/test.mp4" />
            </div>
          </div>
        </div>
        <div className="mt-[128px]">
          <div className="text-16M text-primary text-center ">EIT TALK​</div>
          <div className="relative w-fit mx-auto">
            <div className="text-black text-48M  relative z-10">
              卓越的學習與教學短講​​
            </div>
            <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
          </div>
          <div className="mt-[128px]">
            <Tab titles={["主題演講​", "圓桌論壇"]} />
            <div className="mt-[64px] grid grid-cols-3 gap-[32px]">
              {card.map((item, index) => (
                <div key={index}>
                  <div
                    className="bg-black rounded-[40px] h-[213px]"
                    onClick={() => openModal(item)}
                  >
                    <VideoPlayer src={item.src} small />
                  </div>
                  <div className="p-[8px]">
                    <div className="text-black text-16M ">{item.title}</div>
                    <div className="mt-[8px] text-[#252F3880] text-[12px] ">
                      {item.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Modal
              isOpen={isOpen}
              onRequestClose={closeModal}
              contentLabel="Video Player"
              className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-[100]"
              overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
              <div className="bg-white  max-w-[1152px] w-full p-[32px] rounded-[40px]">
                <div className="w-fit ms-auto">
                  <button onClick={closeModal}>×</button>
                </div>
                <div className="mt-[32px]">
                  {currentVideo && <VideoPlayer src={currentVideo.src} />}
                  <div className="p-[24px]">
                    <div className="text-black text-20M ">
                      {currentVideo.title}
                    </div>
                    <div className="mt-[8px] text-[#252F3880] text-[12px] ">
                      {currentVideo.content}
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
            <div className="mt-[64px] mx-auto w-fit">
              <Button
                text="查看更多"
                textColor="text-white"
                textSize="text-20M"
                bgColor="bg-third"
                padding="p-[24px_32px_24px_32px]"
                src="/icons/24icon/arrow_down_2.svg"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
