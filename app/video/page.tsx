"use client";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Tab } from "@/components/Tab"; // 已修改好的 Tab
import { Button } from "@/components/Button";
import { VideoPlayer } from "@/components/Video/VideoPlayer";
import { useModalContext } from "@/components/ModalContext";

// Set app element for accessibility
if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

// 添加全局樣式
const modalStyles: Modal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    position: "relative",
    top: "auto",
    left: "auto",
    right: "auto",
    bottom: "auto",
    maxWidth: "1152px",
    width: "100%",
    padding: "40px",
    borderRadius: "40px",
    backgroundColor: "white",
    maxHeight: "90vh",
    overflow: "auto",
    scrollbarWidth: "thin",
    scrollbarColor: "#888 #f1f1f1",
    overflowY: "scroll",
  },
};

// Global styles for modal scrollbar
const modalScrollbarStyles = `
  .ReactModal__Content::-webkit-scrollbar {
    width: 8px;
  }
  .ReactModal__Content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  .ReactModal__Content::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  .ReactModal__Content::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

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
  const [card3, setCard3] = useState<CardItem[]>([]); // 新增第三個Tab的資料狀態
  const [data, setData] = useState("");
  const [data2, setData2] = useState("");
  const [displayCount, setDisplayCount] = useState(3); // 新增：控制顯示數量

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      setCard(data.videoPage[0].section1.tab[0].card);
      setCard2(data.videoPage[0].section1.tab[1].card);
      setCard3(data.videoPage[0].section1.tab[2].card); // 新增第三個Tab的資料獲取
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
    setDisplayCount(3); // 重置顯示數量
    console.log(index);
  };

  const handleShowMore = () => {
    setDisplayCount((prev) => prev + 3); // 每次增加3個影片
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: modalScrollbarStyles }} />
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
        <div className="mx-auto  pt-[128px] pb-[160px] max-w-[1200px]  px-3 desktop:px-0">
          <div>
            <div className="text-16M text-primary text-center">
              International Conference on Teacher Education
            </div>
            <div className="relative w-fit  mx-auto">
              <div className="text-black desktop:text-48M text-20M relative z-10">
                師資培育國際學術研討會
              </div>
              <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
            </div>
            <div className="mt-[32px] desktop:mt-[128px]">
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
                    開幕式+主題演講直播
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
                  ＥＬＴ
                </div>
                {!isOpen && (
                  <div className="relative w-fit mx-auto">
                    <div className="text-black desktop:text-48M text-20M relative z-10">
                      卓越的學習與教學短講
                    </div>
                    <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
                  </div>
                )}
                <div className="mt-[32px] desktop:mt-[128px]">
                  <Tab
                    titles={[
                      "研討會主題演講​",
                      "領域教材教法教學實踐計畫",
                      "領域教材教法獲獎論文發表",
                    ]}
                    color="text-[#DD6B00] border-b-6 border-[#DD6B00]"
                    onChange={handleTabChange2}
                  />
                  {selectedTab2 === 0 ? (
                    <>
                      {/* 主題演講 */}
                      <div className="mt-[64px] grid desktop:grid-cols-3 gap-[32px]">
                        {card.slice(0, displayCount).map((item, index) => (
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
                        style={modalStyles}
                      >
                        <div className=" ms-auto pe-[24px]">
                          <button className="text-[20px]" onClick={closeModal}>
                            ×
                          </button>
                        </div>
                        <div className="desktop:mt-[16px]">
                          <div className="max-h-[648px] max-w-[1152px]">
                            {currentVideo && (
                              <VideoPlayer src={currentVideo.src} />
                            )}
                          </div>
                          <div className="p-[24px] mt-[28px] ">
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
                      </Modal>
                      {displayCount < card.length && (
                        <div className="mt-[64px] mx-auto w-fit">
                          <Button
                            text="查看更多"
                            textColor="text-white"
                            textSize="text-20M"
                            bgColor="bg-third"
                            padding="p-[24px_32px_24px_32px]"
                            src="/icons/24icon/arrow_down_2.svg"
                            onClick={handleShowMore}
                          />
                        </div>
                      )}
                    </>
                  ) : selectedTab2 === 1 ? (
                    <>
                      {/* 領域教材教法教學實踐計畫 */}
                      <div className="mt-[64px] grid desktop:grid-cols-3 gap-[32px]">
                        {card2.slice(0, displayCount).map((item, index) => (
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
                        style={modalStyles}
                      >
                        <div className=" ms-auto pe-[24px]">
                          <button className="text-[20px]" onClick={closeModal}>
                            ×
                          </button>
                        </div>
                        <div className="desktop:mt-[16px]">
                          <div className="max-h-[648px] max-w-[1152px]">
                            {currentVideo && (
                              <VideoPlayer src={currentVideo.src} />
                            )}
                          </div>
                          <div className="p-[24px] mt-[28px]">
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
                      </Modal>
                      {displayCount < card2.length && (
                        <div className="mt-[64px] mx-auto w-fit">
                          <Button
                            text="查看更多"
                            textColor="text-white"
                            textSize="text-20M"
                            bgColor="bg-third"
                            padding="p-[24px_32px_24px_32px]"
                            src="/icons/24icon/arrow_down_2.svg"
                            onClick={handleShowMore}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* 領域教材教法獲獎論文發表 */}
                      <div className="mt-[64px] grid desktop:grid-cols-3 gap-[32px]">
                        {card3.slice(0, displayCount).map((item, index) => (
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
                        style={modalStyles}
                      >
                        <div className=" ms-auto pe-[24px]">
                          <button className="text-[20px]" onClick={closeModal}>
                            ×
                          </button>
                        </div>
                        <div className="desktop:mt-[16px]">
                          <div className="max-h-[648px] max-w-[1152px]">
                            {currentVideo && (
                              <VideoPlayer src={currentVideo.src} />
                            )}
                          </div>
                          <div className="p-[24px] mt-[28px]">
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
                      </Modal>
                      {displayCount < card3.length && (
                        <div className="mt-[64px] mx-auto w-fit">
                          <Button
                            text="查看更多"
                            textColor="text-white"
                            textSize="text-20M"
                            bgColor="bg-third"
                            padding="p-[24px_32px_24px_32px]"
                            src="/icons/24icon/arrow_down_2.svg"
                            onClick={handleShowMore}
                          />
                        </div>
                      )}
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
                  ＥＬＴ
                </div>
                {!isOpen && (
                  <div className="relative w-fit mx-auto">
                    <div className="text-black desktop:text-48M text-20M relative z-10">
                      卓越的學習與教學短講
                    </div>
                    <div className="transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
                  </div>
                )}
                <div className="mt-[32px] desktop:mt-[128px]">
                  <Tab
                    titles={[
                      "研討會主題演講​",
                      "領域教材教法教學實踐計畫",
                      "領域教材教法獲獎論文發表",
                    ]}
                    color="text-[#DD6B00] border-b-6 border-[#DD6B00]"
                    onChange={handleTabChange2}
                  />
                  {selectedTab2 === 0 ? (
                    <>
                      {/* 主題演講 */}
                      <div className="mt-[64px] grid desktop:grid-cols-3 gap-[32px]">
                        {card.slice(0, displayCount).map((item, index) => (
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
                        style={modalStyles}
                      >
                        <div className=" ms-auto pe-[24px]">
                          <button className="text-[20px]" onClick={closeModal}>
                            ×
                          </button>
                        </div>
                        <div className="desktop:mt-[16px]">
                          <div className="max-h-[648px] max-w-[1152px]">
                            {currentVideo && (
                              <VideoPlayer src={currentVideo.src} />
                            )}
                          </div>
                          <div className="p-[24px] mt-[28px]">
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
                      </Modal>
                      {displayCount < card.length && (
                        <div className="mt-[64px] mx-auto w-fit">
                          <Button
                            text="查看更多"
                            textColor="text-white"
                            textSize="text-20M"
                            bgColor="bg-third"
                            padding="p-[24px_32px_24px_32px]"
                            src="/icons/24icon/arrow_down_2.svg"
                            onClick={handleShowMore}
                          />
                        </div>
                      )}
                    </>
                  ) : selectedTab2 === 1 ? (
                    <>
                      {/* 領域教材教法教學實踐計畫 */}
                      <div className="mt-[64px] grid desktop:grid-cols-3 gap-[32px]">
                        {card2.slice(0, displayCount).map((item, index) => (
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
                        style={modalStyles}
                      >
                        <div className=" ms-auto pe-[24px]">
                          <button className="text-[20px]" onClick={closeModal}>
                            ×
                          </button>
                        </div>
                        <div className="desktop:mt-[16px]">
                          <div className="max-h-[648px] max-w-[1152px]">
                            {currentVideo && (
                              <VideoPlayer src={currentVideo.src} />
                            )}
                          </div>
                          <div className="p-[24px] mt-[28px]">
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
                      </Modal>
                      {displayCount < card2.length && (
                        <div className="mt-[64px] mx-auto w-fit">
                          <Button
                            text="查看更多"
                            textColor="text-white"
                            textSize="text-20M"
                            bgColor="bg-third"
                            padding="p-[24px_32px_24px_32px]"
                            src="/icons/24icon/arrow_down_2.svg"
                            onClick={handleShowMore}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {/* 領域教材教法獲獎論文發表 */}
                      <div className="mt-[64px] grid desktop:grid-cols-3 gap-[32px]">
                        {card3.slice(0, displayCount).map((item, index) => (
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
                        style={modalStyles}
                      >
                        <div className=" ms-auto pe-[24px]">
                          <button className="text-[20px]" onClick={closeModal}>
                            ×
                          </button>
                        </div>
                        <div className="desktop:mt-[16px]">
                          <div className="max-h-[648px] max-w-[1152px]">
                            {currentVideo && (
                              <VideoPlayer src={currentVideo.src} />
                            )}
                          </div>
                          <div className="p-[24px] mt-[28px]">
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
                      </Modal>
                      {displayCount < card3.length && (
                        <div className="mt-[64px] mx-auto w-fit">
                          <Button
                            text="查看更多"
                            textColor="text-white"
                            textSize="text-20M"
                            bgColor="bg-third"
                            padding="p-[24px_32px_24px_32px]"
                            src="/icons/24icon/arrow_down_2.svg"
                            onClick={handleShowMore}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
