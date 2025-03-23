"use client";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Tab } from "@/components/Tab"; // 已修改好的 Tab
import { Button } from "@/components/Button";
import { VideoPlayer } from "@/components/Video/VideoPlayer";
import { useModalContext } from "@/components/ModalContext";

const query = `
  query videoPage {
    videoPage {
      section1
    }
  }
`;

export default function Page() {
  // 定義影片型別與卡片資料型別
  type VideoType = {
    src: string;
    title: string;
    content: string;
  };
  type CardItem = {
    videos: string; // 假設是 YouTube 影片 ID or 影片 URL
    title: string;
    content: string;
  };

  const [card, setCard] = useState<CardItem[]>([]);
  const [card2, setCard2] = useState<CardItem[]>([]);
  const [data, setData] = useState("");
  const [data2, setData2] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      // 假設結構為：tab[0] 為 ICTE直播，tab[1] 為 ICTE宣傳短片
      setCard(data.videoPage[0].section1.tab[0].cards);
      setCard2(data.videoPage[0].section1.tab[1].cards);
      setData(data.videoPage[0].section1.tab[0].video);
      setData2(data.videoPage[0].section1.tab[1].video);
    }
    fetchData();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoType>({
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

  // 這裡傳入的 video 參數必須符合 VideoType，所以進行轉換
  const openModal = (video: VideoType) => {
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

  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedTab2, setSelectedTab2] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const handleTabChange = (index: number) => {
    setFadeIn(false);
    setTimeout(() => setFadeIn(true), 100);
    setSelectedTab(index);
  };

  const handleTabChange2 = (index: number) => {
    setFadeIn(false);
    setTimeout(() => setFadeIn(true), 100);
    setSelectedTab2(index);
    console.log(index);
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
          <div className="text-third text-16M">Workshop​​</div>
          <div className="text-black text-48M">影片專區​​​</div>
        </div>
      </div>
      <div className="mx-auto w-fit pt-[128px] pb-[160px] max-w-[1200px]">
        <div>
          <div className="text-16M text-primary text-center">
            Abstract Review Results
          </div>
          <div className="relative w-fit mx-auto">
            <div className="text-black text-48M relative z-10">
              第十二屆師資培育國際學術研討會
            </div>
            <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
          </div>
          <div className="mt-[128px]">
            <Tab
              titles={["ICTE直播", "ICTE宣傳短片"]}
              color="text-[#DD6B00] border-b-6 border-[#DD6B00]"
              onChange={handleTabChange}
            />
          </div>
        </div>
        <div className="mt-[64px]">
          {selectedTab === 0 ? (
            <>
              {/* ICTE直播 */}
              <div
                className={`w-fit mx-auto transition-opacity duration-500 ease-in-out ${
                  fadeIn ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-secondary text-36M">
                  ICTE ​活動現場直播
                </div>
                <div className="mt-[8px] text-[#00878580] text-20M text-center">
                  Live Seminar Broadcast
                </div>
              </div>
              <div
                className={`mt-[64px] h-[675px] w-full transition-opacity duration-500 ease-in-out ${
                  fadeIn ? "opacity-100" : "opacity-0"
                }`}
              >
                <VideoPlayer src={data} />
              </div>
              <div className="text-16M text-primary text-center mt-[128px]">
                EIT TALK​
              </div>
              {!isOpen && (
                <div className="relative w-fit mx-auto">
                  <div className="text-black text-48M relative z-10">
                    卓越的學習與教學短講​​
                  </div>
                  <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
                </div>
              )}
              <div className="mt-[128px]">
                <Tab
                  titles={["主題演講​", "圓桌論壇"]}
                  color="text-[#DD6B00] border-b-6 border-[#DD6B00]"
                  onChange={handleTabChange2}
                />
                {selectedTab2 === 0 ? (
                  <>
                    {/* 主題演講 */}
                    <div className="mt-[64px] grid grid-cols-3 gap-[32px]">
                      {card.map((item, index) => (
                        <div key={index}>
                          <div
                            className="bg-black rounded-[40px] h-[213px] cursor-pointer"
                            onClick={() =>
                              openModal({
                                src: item.videos,
                                title: item.title,
                                content: item.content,
                              })
                            }
                          >
                            <VideoPlayer src={item.videos} small />
                          </div>
                          <div className="p-[8px]">
                            <div className="text-black text-16M">
                              {item.title}
                            </div>
                            <div
                              className="mt-[8px] text-[#252F3880] text-[12px]"
                              dangerouslySetInnerHTML={{
                                __html: item.content.replace(/\n/g, "<br>"),
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Modal
                      isOpen={isOpen}
                      onRequestClose={closeModal}
                      contentLabel="Video Player"
                      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                    >
                      <div className="bg-white max-w-[1152px] w-full p-[32px] rounded-[40px]">
                        <div className="w-fit ms-auto">
                          <button onClick={closeModal}>×</button>
                        </div>
                        <div className="mt-[32px]">
                          <div className="h-[648px]">
                            {currentVideo && (
                              <VideoPlayer src={currentVideo.src} />
                            )}
                          </div>
                          <div className="p-[24px]">
                            <div className="text-black text-20M">
                              {currentVideo.title}
                            </div>
                            <div
                              className="mt-[8px] text-[#252F3880] text-[12px]"
                              dangerouslySetInnerHTML={{
                                __html: currentVideo.content.replace(
                                  /\n/g,
                                  "<br>"
                                ),
                              }}
                            ></div>
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
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* 圓桌論壇 */}
                    <div className="mt-[64px] grid grid-cols-3 gap-[32px]">
                      {card2.map((item, index) => (
                        <div key={index}>
                          <div
                            className="bg-black rounded-[40px] h-[213px] cursor-pointer"
                            onClick={() =>
                              openModal({
                                src: item.videos,
                                title: item.title,
                                content: item.content,
                              })
                            }
                          >
                            <VideoPlayer src={item.videos} small />
                          </div>
                          <div className="p-[8px]">
                            <div className="text-black text-16M">
                              {item.title}
                            </div>
                            <div
                              className="mt-[8px] text-[#252F3880] text-[12px]"
                              dangerouslySetInnerHTML={{
                                __html: item.content.replace(/\n/g, "<br>"),
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Modal
                      isOpen={isOpen}
                      onRequestClose={closeModal}
                      contentLabel="Video Player"
                      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                    >
                      <div className="bg-white max-w-[1152px] w-full p-[32px] rounded-[40px]">
                        <div className="w-fit ms-auto">
                          <button onClick={closeModal}>×</button>
                        </div>
                        <div className="mt-[32px]">
                          <div className="h-[648px]">
                            {currentVideo && (
                              <VideoPlayer src={currentVideo.src} />
                            )}
                          </div>
                          <div className="p-[24px]">
                            <div className="text-black text-20M">
                              {currentVideo.title}
                            </div>
                            <div
                              className="mt-[8px] text-[#252F3880] text-[12px]"
                              dangerouslySetInnerHTML={{
                                __html: currentVideo.content.replace(
                                  /\n/g,
                                  "<br>"
                                ),
                              }}
                            ></div>
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
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              {/* ICTE宣傳短片 */}
              <div
                className={`w-fit mx-auto transition-opacity duration-500 ease-in-out ${
                  fadeIn ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="text-primary text-36M">
                  2025 ICT﻿E 會後​​影片​
                </div>
                <div className="mt-[8px] text-[#DD6B0080] text-20M text-center">
                  Post-conference Recap Video
                </div>
              </div>
              <div
                className={`mt-[64px] h-[675px] w-full transition-opacity duration-500 ease-in-out ${
                  fadeIn ? "opacity-100" : "opacity-0"
                }`}
              >
                <VideoPlayer src={data2} />
              </div>
              <div className="text-16M text-primary text-center mt-[128px]">
                EIT TALK​
              </div>
              {!isOpen && (
                <div className="relative w-fit mx-auto">
                  <div className="text-black text-48M relative z-10">
                    卓越的學習與教學短講​​
                  </div>
                  <div className="transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
                </div>
              )}
              <div className="mt-[128px]">
                <Tab
                  titles={["主題演講​", "圓桌論壇"]}
                  color="text-[#DD6B00] border-b-6 border-[#DD6B00]"
                  onChange={handleTabChange2}
                />
                {selectedTab2 === 0 ? (
                  <>
                    {/* 主題演講 */}
                    <div className="mt-[64px] grid grid-cols-3 gap-[32px]">
                      {card.map((item, index) => (
                        <div key={index}>
                          <div
                            className="bg-black rounded-[40px] h-[213px] cursor-pointer"
                            onClick={() =>
                              openModal({
                                src: item.videos,
                                title: item.title,
                                content: item.content,
                              })
                            }
                          >
                            <VideoPlayer src={item.videos} small />
                          </div>
                          <div className="p-[8px]">
                            <div className="text-black text-16M">
                              {item.title}
                            </div>
                            <div
                              className="mt-[8px] text-[#252F3880] text-[12px]"
                              dangerouslySetInnerHTML={{
                                __html: item.content.replace(/\n/g, "<br>"),
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Modal
                      isOpen={isOpen}
                      onRequestClose={closeModal}
                      contentLabel="Video Player"
                      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                    >
                      <div className="bg-white max-w-[1152px] w-full p-[32px] rounded-[40px]">
                        <div className="w-fit ms-auto">
                          <button onClick={closeModal}>×</button>
                        </div>
                        <div className="mt-[32px]">
                          <div className="h-[648px]">
                            {currentVideo && (
                              <VideoPlayer src={currentVideo.src} />
                            )}
                          </div>
                          <div className="p-[24px]">
                            <div className="text-black text-20M">
                              {currentVideo.title}
                            </div>
                            <div
                              className="mt-[8px] text-[#252F3880] text-[12px]"
                              dangerouslySetInnerHTML={{
                                __html: currentVideo.content.replace(
                                  /\n/g,
                                  "<br>"
                                ),
                              }}
                            ></div>
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
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* 圓桌論壇 */}
                    <div className="mt-[64px] grid grid-cols-3 gap-[32px]">
                      {card2.map((item, index) => (
                        <div key={index}>
                          <div
                            className="bg-black rounded-[40px] h-[213px] cursor-pointer"
                            onClick={() =>
                              openModal({
                                src: item.videos,
                                title: item.title,
                                content: item.content,
                              })
                            }
                          >
                            <VideoPlayer src={item.videos} small />
                          </div>
                          <div className="p-[8px]">
                            <div className="text-black text-16M">
                              {item.title}
                            </div>
                            <div
                              className="mt-[8px] text-[#252F3880] text-[12px]"
                              dangerouslySetInnerHTML={{
                                __html: item.content.replace(/\n/g, "<br>"),
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Modal
                      isOpen={isOpen}
                      onRequestClose={closeModal}
                      contentLabel="Video Player"
                      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                    >
                      <div className="bg-white max-w-[1152px] w-full p-[32px] rounded-[40px]">
                        <div className="w-fit ms-auto">
                          <button onClick={closeModal}>×</button>
                        </div>
                        <div className="mt-[32px]">
                          <div className="h-[648px]">
                            {currentVideo && (
                              <VideoPlayer src={currentVideo.src} />
                            )}
                          </div>
                          <div className="p-[24px]">
                            <div className="text-black text-20M">
                              {currentVideo.title}
                            </div>
                            <div
                              className="mt-[8px] text-[#252F3880] text-[12px]"
                              dangerouslySetInnerHTML={{
                                __html: currentVideo.content.replace(
                                  /\n/g,
                                  "<br>"
                                ),
                              }}
                            ></div>
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
                      />
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
