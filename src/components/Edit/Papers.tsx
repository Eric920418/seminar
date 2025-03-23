"use client";
import { gql } from "graphql-tag";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";
import Link from "next/link";
import dynamic from "next/dynamic";

const CustomEditor = dynamic(() => import("@/components/CustomEditor"), {
  ssr: false,
});

const UPDATE_PAGE = gql`
  mutation UpdatePaperPage($input: UpdatePaperPageInput!) {
    updatePaperPage(input: $input) {
      section1
      section2
      section3
      section4
    }
  }
`;

const query = `
  query paperPage {
    paperPage {
      section1
      section2
      section3
      section4
    }
  }
`;

const query2 = `
  query host {
    host {
      section1
    }
  }
`;

export const Papers = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [height1, setHeight1] = useState(0);
  const contentRef1 = useRef<HTMLDivElement>(null);

  const [isOpen2, setIsOpen2] = useState(false);
  const [height2, setHeight2] = useState(0);
  const contentRef2 = useRef<HTMLDivElement>(null);

  const [isOpen3, setIsOpen3] = useState(false);
  const [height3, setHeight3] = useState(0);
  const contentRef3 = useRef<HTMLDivElement>(null);

  const [isOpen4, setIsOpen4] = useState(false);
  const [height4, setHeight4] = useState(0);
  const contentRef4 = useRef<HTMLDivElement>(null);

  const [editorCards, setEditorCards] = useState([]);
  const [editorCards2, setEditorCards2] = useState([]);

  const [editorContents, setEditorContents] = useState({
    editor1: "",
    editor2: "",
    editor3: "",
    editor4: "",
    editor5: "",
    editor6: "",
    editor7: "",
    editor8: "",
    editor9: "",
    editor10: "",
    editor11: "",
    editor12: "",
    editor13: "",
    editor14: "",
    editor15: "",
    editor16: "",
    editor17: "",
    editor18: "",
    editor19: "",
    editor20: "",
  });
  const [editorCards3, setEditorCards3] = useState([]);
  const [editorCards4, setEditorCards4] = useState([]);

  const [selectHost, setSelectHost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      setEditorCards(data.paperPage[0].section1.tab[0].card);
      setEditorCards2(data.paperPage[0].section1.tab[1].card);
      setEditorContents({
        editor1: data.paperPage[0].section2.dataContent1,
        editor2: data.paperPage[0].section2.dataText2,
        editor3: data.paperPage[0].section2.dataText3,
        editor4: data.paperPage[0].section2.dataLink1,
        editor5: data.paperPage[0].section2.dataLink2,
        editor6: data.paperPage[0].section2.dataLink3,
        editor7: data.paperPage[0].section2.dataQrCode,
        editor8: data.paperPage[0].section2.dataCKEdit,
        editor9: data.paperPage[0].section2.dataDate,
        editor10: data.paperPage[0].section2.dataA,
        editor11: data.paperPage[0].section2.dataArea,
        editor12: data.paperPage[0].section2.content1,
        editor13: data.paperPage[0].section2.content2,
        editor14: data.paperPage[0].section2.content3,
        editor15: data.paperPage[0].section2.content4,
        editor16: data.paperPage[0].section2.content5,
        editor17: data.paperPage[0].section2.content6,
        editor18: data.paperPage[0].section2.content7,
        editor19: data.paperPage[0].section2.content8,
        editor20: data.paperPage[0].section2.text1,
      });
      setEditorCards3(data.paperPage[0].section3.card);
      setEditorCards4(data.paperPage[0].section4.card);
    };

    fetchData();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: query2,
        }),
      });
      const { data } = await res.json();
      setSelectHost((prevHosts) => {
        const newHosts = data.host[0].section1.editorCards.map((card) => ({
          name: card.name,
        }));
        return [...prevHosts, ...newHosts];
      });
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (contentRef1.current) {
      setHeight1(isOpen1 ? contentRef1.current.scrollHeight : 0);
    }
  }, [isOpen1, editorCards, editorCards2]);

  useEffect(() => {
    if (contentRef2.current) {
      setHeight2(isOpen2 ? contentRef2.current.scrollHeight : 0);
    }
  }, [
    isOpen2,
    editorContents.editor1,
    editorContents.editor2,
    editorContents.editor3,
    editorContents.editor4,
    editorContents.editor5,
    editorContents.editor6,
    editorContents.editor7,
    editorContents.editor8,
    editorContents.editor9,
    editorContents.editor10,
    editorContents.editor11,
    editorContents.editor12,
    editorContents.editor13,
    editorContents.editor14,
    editorContents.editor15,
    editorContents.editor16,
    editorContents.editor17,
    editorContents.editor18,
    editorContents.editor19,
    editorContents.editor20,
  ]);

  useEffect(() => {
    if (contentRef3.current) {
      setHeight3(isOpen3 ? contentRef3.current.scrollHeight : 0);
    }
  }, [isOpen3, editorCards3]);

  useEffect(() => {
    if (contentRef4.current) {
      setHeight4(isOpen4 ? contentRef4.current.scrollHeight : 0);
    }
  }, [isOpen4, editorCards4]);

  const handleCardChange = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    const newCards = [...editorCards];
    newCards[index] = {
      ...newCards[index],
      [field]: value,
    };
    setEditorCards(newCards);
  };

  const addCard = () => {
    setEditorCards([...editorCards, { title: "", content: "", EnContent: "" }]);
  };

  const DeleteCard = (index: number) => {
    const newCards = editorCards.filter((_, idx) => idx !== index);
    setEditorCards(newCards);
  };

  const handleCardChange2 = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    const newCards = [...editorCards2];
    newCards[index] = {
      ...newCards[index],
      [field]: value,
    };
    setEditorCards2(newCards);
  };

  const addCard2 = () => {
    setEditorCards2([
      ...editorCards2,
      { title: "", content: "", EnContent: "" },
    ]);
  };

  const DeleteCard2 = (index: number) => {
    const newCards = editorCards2.filter((_, idx) => idx !== index);
    setEditorCards2(newCards);
  };

  const handleEditorChange = (id: string, content: string) => {
    setEditorContents((prev) => ({
      ...prev,
      [id]: content,
    }));
  };

  const handleCardChange3 = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    const newCards = [...editorCards3];
    newCards[index] = {
      ...newCards[index],
      [field]: value,
    };
    setEditorCards3(newCards);
  };

  const addCard3 = () => {
    setEditorCards3([...editorCards3, { title: "", content: "", id: "" }]);
  };

  const DeleteCard3 = (index: number) => {
    const newCards = editorCards3.filter((_, idx) => idx !== index);
    setEditorCards3(newCards);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (jsonErr) {
        console.error("解析 JSON 時出錯：", jsonErr);
        data = {};
      }
      if (res.ok) {
        console.log(`上傳成功！檔案存取網址：${data.fileUrl}`);
      } else {
        console.log("上傳失敗：" + data.error);
      }
    } catch (error) {
      console.error("上傳錯誤：", error);
      console.log("上傳過程發生錯誤！");
    }
  };

  const handleCardChange4 = (
    index: number,
    field: string,
    value: string | string[]
  ) => {
    const newCards = [...editorCards4];
    newCards[index] = {
      ...newCards[index],
      [field]: value,
    };
    setEditorCards4(newCards);
  };

  const addCard4 = () => {
    setEditorCards4([...editorCards4, { title: "", content: "", id: "" }]);
  };

  const DeleteCard4 = (index: number) => {
    const newCards = editorCards4.filter((_, idx) => idx !== index);
    setEditorCards4(newCards);
  };

  const handleUpdate = async () => {
    const input = {
      section1: {
        tab: [
          {
            card: editorCards,
          },
          {
            card: editorCards2,
          },
        ],
      },
      section2: {
        dataContent1: editorContents.editor1,
        dataText2: editorContents.editor2,
        dataText3: editorContents.editor3,
        dataLink1: editorContents.editor4,
        dataLink2: editorContents.editor5,
        dataLink3: editorContents.editor6,
        dataQrCode: editorContents.editor7,
        dataCKEdit: editorContents.editor8,
        dataDate: editorContents.editor9,
        dataA: editorContents.editor10,
        dataArea: editorContents.editor11,
        content1: editorContents.editor12,
        content2: editorContents.editor13,
        content3: editorContents.editor14,
        content4: editorContents.editor15,
        content5: editorContents.editor16,
        content6: editorContents.editor17,
        content7: editorContents.editor18,
        content8: editorContents.editor19,
        text1: editorContents.editor20,
      },
      section3: {
        card: editorCards3,
      },
      section4: {
        card: editorCards4,
      },
    };

    try {
      const response = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: UPDATE_PAGE.loc?.source.body,
          variables: { input },
        }),
      });
      const result = await response.json();
      if (result.errors) {
        console.error("更新失敗:", JSON.stringify(result.errors, null, 2));
      } else {
        alert("更新成功");
      }
    } catch (err) {
      console.error("更新失敗:", err);
    }
  };

  return (
    <div>
      <div className="text-32M mb-6">ICTE論文</div>
      <div className="flex flex-col gap-[16px]">
        {/* 區塊一 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between">
            <div>論文摘要審查結果公告</div>
            <Image
              src="/icons/24icon/arrow_right.svg"
              className={`cursor-pointer transition-transform duration-300 ${
                isOpen1 ? "rotate-90" : ""
              }`}
              width={24}
              height={24}
              alt="arrow"
              onClick={() => setIsOpen1(!isOpen1)}
            />
          </div>
          <div
            ref={contentRef1}
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height1}px` }}
          >
            <div className="my-3 flex space-x-3">
              <div>口頭​論文​</div>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={addCard}
              >
                新增卡片
              </button>
            </div>
            <div>
              {editorCards.map((card, index) => (
                <div key={index} className="my-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="標題"
                      value={card.title}
                      onChange={(e) =>
                        handleCardChange(index, "title", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />

                    <textarea
                      placeholder="內文"
                      value={card.content}
                      onChange={(e) =>
                        handleCardChange(index, "content", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
                    <input
                      type="text"
                      placeholder="內文"
                      value={card.EnContent}
                      onChange={(e) =>
                        handleCardChange(index, "EnContent", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => DeleteCard(index)}
                    >
                      刪除
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="my-3 flex space-x-3">
              <div>海報論文​</div>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={addCard2}
              >
                新增卡片
              </button>
            </div>
            <div>
              {editorCards2.map((card, index) => (
                <div key={index} className="my-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="標題"
                      value={card.title}
                      onChange={(e) =>
                        handleCardChange2(index, "title", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />

                    <textarea
                      placeholder="內文"
                      value={card.content}
                      onChange={(e) =>
                        handleCardChange2(index, "content", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
                    <input
                      type="text"
                      placeholder="影片網址"
                      value={card.EnContent}
                      onChange={(e) =>
                        handleCardChange2(index, "EnContent", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => DeleteCard2(index)}
                    >
                      刪除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* 區塊二 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between">
            <div>徵文主題與論文格式</div>
            <Image
              src="/icons/24icon/arrow_right.svg"
              className={`cursor-pointer transition-transform duration-300 ${
                isOpen2 ? "rotate-90" : ""
              }`}
              width={24}
              height={24}
              alt="arrow"
              onClick={() => setIsOpen2(!isOpen2)}
            />
          </div>
          <div
            ref={contentRef2}
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height2}px` }}
          >
            <div>
              <div className="mt-[16px]">
                <div className="text-secondary text-20M ">學術論文發表</div>
                <div className="mt-[24px] text-[#252F38B2] text-16R ">
                  {editorContents.editor1}
                </div>
              </div>
              <div className="mt-[32px] grid grid-cols-2 gap-[32px] ">
                <div className="flex flex-col gap-[32px] ">
                  <div className="bg-white p-[32px] rounded-[24px]">
                    <div className="text-secondary text-20M ">徵稿主題</div>
                    <div className="mt-[24px] text-black text-15R  ">
                      {editorContents.editor2}
                    </div>
                    <div
                      className="mt-[16px] text-black text-15R  "
                      dangerouslySetInnerHTML={{
                        __html: editorContents.editor3.replace(/\n/g, "<br>"),
                      }}
                    ></div>
                  </div>
                  <div className="bg-white p-[32px] rounded-[24px] flex-1">
                    <div className="text-secondary text-20M ">投稿方式</div>
                    <div className="mt-[24px] flex space-x-[16px]">
                      <div className="text-black text-15R ">
                        填妥
                        <span>
                          <Link
                            href={editorContents.editor4}
                            className="text-blue-500 underline text-16R  break-all mt-[4px]"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            投稿者基本資料表（點此下載附件1）
                          </Link>
                        </span>
                        及
                        <span>
                          <Link
                            href={editorContents.editor5}
                            className="text-blue-500 underline text-16R  break-all mt-[4px]"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            論文摘要格式（點此下載附件2）
                          </Link>
                        </span>
                        後，上傳至
                        <span>
                          <Link
                            href={editorContents.editor6}
                            className="text-blue-500 underline text-16R  break-all mt-[4px]"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            https://reurl.cc/lgmjKQ
                          </Link>
                        </span>
                        ，亦可掃描投稿QRcode上傳。
                      </div>
                      <div>
                        <QRCodeCanvas
                          value={editorContents.editor7}
                          size={110}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[32px] ">
                  <div className="bg-white p-[32px] rounded-[24px]">
                    <div className="text-secondary text-20M ">徵稿對象</div>
                    <div
                      className="mt-[24px] text-black text-15R"
                      dangerouslySetInnerHTML={{
                        __html: editorContents.editor19.replace(/\n/g, "<br>"),
                      }}
                    ></div>
                  </div>
                  <div className="bg-white p-[32px] rounded-[24px]">
                    <div className="text-secondary text-20M ">
                      審查結果通知日期
                    </div>
                    <div className="mt-[24px] text-black text-15R  ">
                      {editorContents.editor8}
                      <span>
                        <Link
                          href={editorContents.editor9}
                          className="text-blue-500 underline text-16R  break-all mt-[4px]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {editorContents.editor9}
                        </Link>
                      </span>
                      ）
                    </div>
                  </div>
                  <div className="bg-white p-[32px] rounded-[24px] flex-1">
                    <div className="text-secondary text-20M ">
                      投稿形式：論文摘要
                    </div>
                    <div
                      className="mt-[24px] text-black text-15R  "
                      dangerouslySetInnerHTML={{
                        __html: editorContents.editor10.replace(/\n/g, "<br>"),
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mt-[16px]">
                <div className="bg-white p-[32px] rounded-[24px]">
                  <div className="text-secondary text-20M ">
                    入選稿件之注意事項
                  </div>
                  <div className="mt-[24px] text-black text-15R  ">
                    <span>{editorContents.editor11}</span>
                    <br />
                    <span>{editorContents.editor12}</span>
                    <span>
                      <Link
                        href={editorContents.editor13}
                        className="text-blue-500 underline text-16R  break-all mt-[4px]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        附件3。
                      </Link>
                    </span>
                    <br />
                    <span>{editorContents.editor14}</span>
                    <span>
                      <Link
                        href={editorContents.editor15}
                        className="text-blue-500 underline text-16R  break-all mt-[4px]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        附件4。
                      </Link>
                    </span>
                    <br />
                    <span>{editorContents.editor16}</span>
                    <span>
                      <Link
                        href={editorContents.editor17}
                        className="text-blue-500 underline text-16R  break-all mt-[4px]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        附件5。
                      </Link>
                    </span>
                    <br />
                    <span>{editorContents.editor18}</span>
                  </div>
                </div>
              </div>
              <div className="mt-[16px]">
                <div className="bg-white p-[32px] rounded-[24px]">
                  <div className="text-secondary text-20M ">聯絡窗口</div>
                  <div
                    className="mt-[24px] text-black text-15R "
                    dangerouslySetInnerHTML={{
                      __html: editorContents.editor20.replace(/\n/g, "<br>"),
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="w-full my-3 relative">
              <div className="my-3">
                <input
                  type="text"
                  value={editorContents.editor1}
                  placeholder="學術論文發表"
                  onChange={(e) =>
                    handleEditorChange("editor1", e.target.value)
                  }
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                />
              </div>
              <div className="my-3">
                <input
                  type="text"
                  value={editorContents.editor2}
                  placeholder="徵稿主題"
                  onChange={(e) =>
                    handleEditorChange("editor2", e.target.value)
                  }
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                />
              </div>
              <textarea
                placeholder="徵稿子題"
                value={editorContents.editor3}
                onChange={(e) => handleEditorChange("editor3", e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 my-3"
              />
              <div className="flex w-full my-3 space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={editorContents.editor4}
                    placeholder="連結一"
                    onChange={(e) =>
                      handleEditorChange("editor4", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={editorContents.editor5}
                    placeholder="連結二"
                    onChange={(e) =>
                      handleEditorChange("editor5", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={editorContents.editor6}
                    placeholder="連結三"
                    onChange={(e) =>
                      handleEditorChange("editor6", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={editorContents.editor7}
                    placeholder="QR Code"
                    onChange={(e) =>
                      handleEditorChange("editor7", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
              </div>
              <div className="flex w-full my-3 space-x-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={editorContents.editor8}
                    placeholder="審查結果通知日期"
                    onChange={(e) =>
                      handleEditorChange("editor8", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={editorContents.editor9}
                    placeholder="審查結果連結"
                    onChange={(e) =>
                      handleEditorChange("editor9", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
              </div>
              <textarea
                placeholder=" 投稿形式：論文摘要"
                value={editorContents.editor10}
                onChange={(e) => handleEditorChange("editor10", e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 my-3"
              />
              <div className="my-3">
                <input
                  type="text"
                  value={editorContents.editor11}
                  placeholder="入選稿件之注意事項(一)"
                  onChange={(e) =>
                    handleEditorChange("editor11", e.target.value)
                  }
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                />
                <div className="flex space-x-3 my-3">
                  <input
                    type="text"
                    value={editorContents.editor12}
                    placeholder="入選稿件之注意事項(二)"
                    onChange={(e) =>
                      handleEditorChange("editor12", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                  <input
                    type="text"
                    value={editorContents.editor13}
                    placeholder="附件3"
                    onChange={(e) =>
                      handleEditorChange("editor13", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
                <div className="flex space-x-3 my-3">
                  <input
                    type="text"
                    value={editorContents.editor14}
                    placeholder="入選稿件之注意事項(三)"
                    onChange={(e) =>
                      handleEditorChange("editor14", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                  <input
                    type="text"
                    value={editorContents.editor15}
                    placeholder="附件4"
                    onChange={(e) =>
                      handleEditorChange("editor15", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
                <div className="flex space-x-3 my-3">
                  <input
                    type="text"
                    value={editorContents.editor16}
                    placeholder="入選稿件之注意事項(四)"
                    onChange={(e) =>
                      handleEditorChange("editor16", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                  <input
                    type="text"
                    value={editorContents.editor17}
                    placeholder="附件5"
                    onChange={(e) =>
                      handleEditorChange("editor17", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
                <input
                  type="text"
                  value={editorContents.editor18}
                  placeholder="入選稿件之注意事項(五)"
                  onChange={(e) =>
                    handleEditorChange("editor18", e.target.value)
                  }
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                />
              </div>
              <CustomEditor
                onContentChange={(e) => handleEditorChange("editor19", e)}
              />
              <textarea
                placeholder=" 投稿形式：論文摘要"
                value={editorContents.editor20}
                onChange={(e) => handleEditorChange("editor20", e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 mt-3 mb-12"
              />
            </div>
          </div>
        </div>
        {/* 區塊三 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between">
            <div>口頭發表場次</div>
            <Image
              src="/icons/24icon/arrow_right.svg"
              className={`cursor-pointer transition-transform duration-300 ${
                isOpen3 ? "rotate-90" : ""
              }`}
              width={24}
              height={24}
              alt="arrow"
              onClick={() => setIsOpen3(!isOpen3)}
            />
          </div>
          <div
            ref={contentRef3}
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height3}px` }}
          >
            <div className="my-3 flex space-x-3">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={addCard3}
              >
                新增卡片
              </button>
            </div>
            <div>
              {editorCards3.map((card, index) => (
                <div key={index} className="my-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="標題"
                      value={card.title}
                      onChange={(e) =>
                        handleCardChange3(index, "title", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
                    <input
                      type="text"
                      placeholder="標題"
                      value={card.content}
                      onChange={(e) =>
                        handleCardChange3(index, "content", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />

                    <select
                      value={card.id}
                      onChange={(e) =>
                        handleCardChange3(index, "id", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-6 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    >
                      <option value="">請選擇</option>
                      {selectHost.map((host, index) => (
                        <option key={index} value={host.id}>
                          {host.name}
                        </option>
                      ))}
                    </select>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => DeleteCard3(index)}
                    >
                      刪除
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div>檔名必須是口頭發表</div>
            <input
              type="file"
              accept="application/pdf"
              className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
              onChange={handleFileChange}
            />
          </div>
        </div>
        {/* 區塊四 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between">
            <div>海報發表場次</div>
            <Image
              src="/icons/24icon/arrow_right.svg"
              className={`cursor-pointer transition-transform duration-300 ${
                isOpen4 ? "rotate-90" : ""
              }`}
              width={24}
              height={24}
              alt="arrow"
              onClick={() => setIsOpen4(!isOpen4)}
            />
          </div>
          <div
            ref={contentRef4}
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height4}px` }}
          >
            <div className="my-3 flex space-x-3">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={addCard4}
              >
                新增卡片
              </button>
            </div>
            <div>
              {editorCards4.map((card, index) => (
                <div key={index} className="my-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="姓名"
                      value={card.title}
                      onChange={(e) =>
                        handleCardChange4(index, "title", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
                    <input
                      type="text"
                      placeholder="標題"
                      value={card.content}
                      onChange={(e) =>
                        handleCardChange4(index, "content", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />

                    <input
                      type="text"
                      placeholder="pdf檔名"
                      value={card.id}
                      onChange={(e) =>
                        handleCardChange4(index, "id", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => DeleteCard4(index)}
                    >
                      刪除
                    </button>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 my-3"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleUpdate}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            更新資料
          </button>
        </div>
      </div>
    </div>
  );
};
