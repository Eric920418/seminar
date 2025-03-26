"use client";
import { gql } from "graphql-tag";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ImageUploader } from "@/components/Admin/ImageUploader";
import dynamic from "next/dynamic";
import Link from "next/link";

const CustomEditor = dynamic(() => import("@/components/CustomEditor"), {
  ssr: false,
});

const UPDATE_PAGE = gql`
  mutation UpdateMeetingPage($input: UpdateMeetingPageInput!) {
    updateMeetingPage(input: $input) {
      section1
      section2
      section3
      section4
      section5
      section6
      section7
    }
  }
`;

const query = `
  query meetingPage {
    meetingPage {
      section1
      section2
      section3
      section4
      section5
      section6
      section7
    }
  }
`;
export const Meeting = () => {
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

  const [isOpen5, setIsOpen5] = useState(false);
  const [height5, setHeight5] = useState(0);
  const contentRef5 = useRef<HTMLDivElement>(null);

  const [isOpen6, setIsOpen6] = useState(false);
  const [height6, setHeight6] = useState(0);
  const contentRef6 = useRef<HTMLDivElement>(null);

  const [isOpen7, setIsOpen7] = useState(false);
  const [height7, setHeight7] = useState(0);
  const contentRef7 = useRef<HTMLDivElement>(null);

  const [editorCards, setEditorCards] = useState([]);
  const [editorTimes, setEditorTimes] = useState({
    editor1: "",

    editor6: "",
    editor7: "",
    editor8: "",
    editor9: "",
    editor10: "",
  });

  const [editorRule, setEditorRule] = useState({
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
  });

  const [editorOnline, setEditorOnline] = useState({
    editor1: "",
    editor2: "",
    editor3: "",
    editor4: "",
    editor5: "",
  });

  const [editorTransportation, setEditorTransportation] = useState("");

  const [accommodations, setAccommodations] = useState([]);

  const [editorMapImage, setEditorMapImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      setEditorCards(data.meetingPage[0].section1.list);

      setEditorTimes({
        editor1: data.meetingPage[0].section2?.times?.time1 || "",

        editor6: data.meetingPage[0].section2?.times?.time6 || "",
        editor7: data.meetingPage[0].section2?.times?.time7 || "",
        editor8: data.meetingPage[0].section2?.times?.time8 || "",
        editor9: data.meetingPage[0].section2?.times?.meeting || "",
        editor10: data.meetingPage[0].section2?.times?.dinner || "",
      });

      setEditorRule({
        editor1: data.meetingPage[0].section3?.content1 || "",
        editor2: data.meetingPage[0].section3?.time1 || "",
        editor3: data.meetingPage[0].section3?.content2 || "",
        editor4: data.meetingPage[0].section3?.time2 || "",
        editor5: data.meetingPage[0].section3?.content3 || "",
        editor6: data.meetingPage[0].section3?.time3 || "",
        editor7: data.meetingPage[0].section3?.content4 || "",
        editor8: data.meetingPage[0].section3?.time4 || "",
        editor9: data.meetingPage[0].section3?.content5 || "",
        editor10: data.meetingPage[0].section3?.time5 || "",
      });

      setEditorOnline({
        editor1: data.meetingPage[0].section4?.content || "",
        editor2: data.meetingPage[0].section4?.form || "",
        editor3: data.meetingPage[0].section4?.date1 || "",
        editor4: data.meetingPage[0].section4?.url || "",
        editor5: data.meetingPage[0].section4?.date2 || "",
      });

      setEditorTransportation(data.meetingPage[0].section5?.location || "");

      setAccommodations(data.meetingPage[0].section6);

      setEditorMapImage(data.meetingPage[0].section7?.MapUrl);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (contentRef1.current) {
      setHeight1(isOpen1 ? contentRef1.current.scrollHeight : 0);
    }
  }, [isOpen1, editorCards]);

  useEffect(() => {
    if (contentRef2.current) {
      setHeight2(isOpen2 ? contentRef2.current.scrollHeight : 0);
    }
  }, [
    isOpen2,
    editorTimes.editor1,

    editorTimes.editor6,
    editorTimes.editor7,
    editorTimes.editor8,
    editorTimes.editor9,
    editorTimes.editor10,
  ]);

  useEffect(() => {
    if (contentRef3.current) {
      setHeight3(isOpen3 ? contentRef3.current.scrollHeight : 0);
    }
  }, [
    isOpen3,
    editorRule.editor1,
    editorRule.editor2,
    editorRule.editor3,
    editorRule.editor4,
    editorRule.editor5,
    editorRule.editor6,
    editorRule.editor7,
    editorRule.editor8,
    editorRule.editor9,
    editorRule.editor10,
  ]);

  useEffect(() => {
    if (contentRef4.current) {
      setHeight4(isOpen4 ? contentRef4.current.scrollHeight : 0);
    }
  }, [
    isOpen4,
    editorOnline.editor1,
    editorOnline.editor2,
    editorOnline.editor3,
    editorOnline.editor4,
    editorOnline.editor5,
  ]);

  useEffect(() => {
    if (contentRef5.current) {
      setHeight5(isOpen5 ? contentRef5.current.scrollHeight : 0);
    }
  }, [isOpen5, editorTransportation]);

  useEffect(() => {
    if (contentRef6.current) {
      setHeight6(isOpen6 ? contentRef6.current.scrollHeight : 0);
    }
  }, [isOpen6, accommodations]);

  useEffect(() => {
    if (contentRef7.current) {
      setHeight7(isOpen7 ? contentRef7.current.scrollHeight : 0);
    }
  }, [isOpen7, editorMapImage]);

  const handleCardChange = (index: number, field: string, value: string) => {
    const newCards = [...editorCards];
    newCards[index] = { ...newCards[index], [field]: value };
    setEditorCards(newCards);
  };

  const addCard = () => {
    if (!isOpen2) {
      setIsOpen2(true);
    }
    setEditorCards([...editorCards, { date: "", content: "" }]);
  };
  const DeleteCard = (index: number) => {
    const newCards = editorCards.filter((_, idx) => idx !== index);
    setEditorCards(newCards);
  };

  const handleEditorChange2 = (id: string, content: string) => {
    setEditorTimes((prev) => ({
      ...prev,
      [id]: content,
    }));
  };

  const handleEditorChange3 = (id: string, content: string) => {
    setEditorRule((prev) => ({
      ...prev,
      [id]: content,
    }));
  };

  const handleEditorChange4 = (id: string, content: string) => {
    setEditorOnline((prev) => ({
      ...prev,
      [id]: content,
    }));
  };

  const handleImageUpload = (index, data) => {
    handleInputChange(index, "image", data.fileUrl.fileUrl);
  };

  const addAccommodation = () => {
    setAccommodations([
      ...accommodations,
      {
        image: "",
        title: "",
        url: "",
        location: "",
        phone: "",
        map: "",
        form: "",
        content: "",
      },
    ]);
  };

  // 更新某一筆住宿資料的欄位值
  const handleInputChange = (index, key, value) => {
    const newAccommodations = accommodations.map((item, idx) =>
      idx === index ? { ...item, [key]: value } : item
    );
    setAccommodations(newAccommodations);
  };

  const handleDeleteAccommodation = (index) => {
    const updatedAccommodations = accommodations.filter(
      (_, idx) => idx !== index
    );
    setAccommodations(updatedAccommodations);
  };

  const handleImageUpload3 = (data) => {
    setEditorMapImage(data.fileUrl.fileUrl);
  };

  const handleUpdate = async () => {
    const input = {
      section1: {
        list: editorCards,
      },
      section2: {
        times: {
          time1: editorTimes.editor1,

          time6: editorTimes.editor6,
          time7: editorTimes.editor7,
          time8: editorTimes.editor8,
          meeting: editorTimes.editor9,
          dinner: editorTimes.editor10,
        },
      },
      section3: {
        content1: editorRule.editor1,
        time1: editorRule.editor2,
        content2: editorRule.editor3,
        time2: editorRule.editor4,
        content3: editorRule.editor5,
        time3: editorRule.editor6,
        content4: editorRule.editor7,
        time4: editorRule.editor8,
        content5: editorRule.editor9,
        time5: editorRule.editor10,
      },
      section4: {
        content: editorOnline.editor1,
        form: editorOnline.editor2,
        date1: editorOnline.editor3,
        url: editorOnline.editor4,
        date2: editorOnline.editor5,
      },
      section5: {
        location: editorTransportation,
      },
      section6: accommodations,
      section7: {
        MapUrl: editorMapImage,
      },
    };

    try {
      const response = await fetch("/api/graphql", {
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
      <div className="text-32M mb-6">ICTE會議資訊</div>
      <div className="flex flex-col gap-[16px]">
        {/* 區塊一 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between items-center">
            <div>區塊一 會議議程</div>
            <div className="flex items-center gap-2">
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
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={addCard}
              >
                新增卡片
              </button>
            </div>
          </div>
          <div
            ref={contentRef1}
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height1}px` }}
          >
            <div className="w-full my-6 relative space-y-6">
              {editorCards.map((card, index) => (
                <div
                  key={index}
                  className="p-[16px] border border-gray-300 rounded"
                >
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="日期"
                      value={card.date}
                      onChange={(e) =>
                        handleCardChange(index, "date", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
                  </div>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded mt-2"
                    onClick={() => DeleteCard(index)}
                  >
                    刪除卡片
                  </button>
                  <div className="my-[32px] flex items-center bg-white">
                    <div className=" text-black text-20R">
                      <span
                        dangerouslySetInnerHTML={{ __html: card.content }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* 區塊二 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between items-center">
            <div>區塊二 重要時程</div>
            <div className="flex items-center gap-2">
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
          </div>
          <div
            ref={contentRef2}
            className=" overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height2}px` }}
          >
            <div className="mt-[32px] w-[240px] my-12">
              <div className="flex">
                <div className="text-primary text-20M me-1">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: editorTimes.editor1,
                    }}
                  />
                </div>
              </div>
              <div className="flex space-x-1">
                <CustomEditor
                  onContentChange={(content) =>
                    handleEditorChange2("editor1", content)
                  }
                />
              </div>
            </div>
            <div className="mt-[32px] flex gap-[32px]  w-full  my-6">
              <div>
                <div className="text-primary text-20M">
                  {editorTimes.editor6}
                  <input
                    type="text"
                    value={editorTimes.editor6}
                    placeholder=""
                    onChange={(e) =>
                      handleEditorChange2("editor6", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
                <div className="text-primary text-20M">
                  {editorTimes.editor7}
                  <input
                    type="text"
                    value={editorTimes.editor7}
                    placeholder=""
                    onChange={(e) =>
                      handleEditorChange2("editor7", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
                <div className="text-primary text-20M">
                  {editorTimes.editor8}
                  <input
                    type="text"
                    value={editorTimes.editor8}
                    placeholder=""
                    onChange={(e) =>
                      handleEditorChange2("editor8", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
              </div>
              <div className=" flex flex-col gap-[16px]">
                <div className="w-[240px] bg-[#FFEFB0] p-[16px] flex flex-col gap-[4px] rounded-[20px]">
                  <div className="text-black text-20M">會議</div>
                  <div className="text-black text-16M">
                    {editorTimes.editor9}
                    <input
                      type="text"
                      value={editorTimes.editor9}
                      placeholder=""
                      onChange={(e) =>
                        handleEditorChange2("editor9", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
                  </div>
                </div>
                <div className="w-[240px] bg-[#FFEFB0] p-[16px] flex flex-col gap-[4px] rounded-[20px]">
                  <div className="text-black text-20M">晚宴</div>
                  <div className="text-black text-16M">
                    {editorTimes.editor10}
                    <input
                      type="text"
                      value={editorTimes.editor10}
                      placeholder=""
                      onChange={(e) =>
                        handleEditorChange2("editor10", e.target.value)
                      }
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 區塊三*/}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between items-center">
            <div>區塊三 發表規則</div>
            <div className="flex items-center gap-2">
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
          </div>
          <div
            ref={contentRef3}
            className="  overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height3}px` }}
          >
            <div className="w-full">
              <div className="mt-[16px] flex space-x-[32px] ">
                <div className="bg-white p-[32px] rounded-[24px] flex-1 min-w-0">
                  <div className="text-secondary text-20M ">圓桌論﻿壇</div>
                  <div className="mt-[24px] text-black text-[15px] leading-[28px] font-[500] ">
                    {editorRule.editor1}
                  </div>
                  <div
                    className=" mt-[16px] text-black text-[15px] leading-[28px] font-[400]"
                    dangerouslySetInnerHTML={{
                      __html: editorRule.editor2.replace(/\n/g, "<br>"),
                    }}
                  ></div>
                </div>
                <div className="bg-white p-[32px] rounded-[24px] flex-1 min-w-0">
                  <div className="text-secondary text-20M ">
                    國外學者專題演講
                  </div>
                  <div className="mt-[24px] text-black text-[15px] leading-[28px] font-[500] ">
                    {editorRule.editor3}
                  </div>
                  <div
                    className=" mt-[16px] text-black text-[15px] leading-[28px] font-[400] "
                    dangerouslySetInnerHTML={{
                      __html: editorRule.editor4.replace(/\n/g, "<br>"),
                    }}
                  ></div>
                </div>
              </div>
              <div className="mt-[32px] ">
                <div className="bg-white p-[32px] rounded-[24px] flex-1 min-w-0">
                  <div className="text-secondary text-20M ">論文發表</div>
                  <div className="mt-[24px] text-black text-[15px] leading-[28px] font-[500] ">
                    {editorRule.editor5}
                  </div>
                  <div
                    className=" mt-[16px] text-black text-[15px] leading-[28px] font-[400] "
                    dangerouslySetInnerHTML={{
                      __html: editorRule.editor6.replace(/\n/g, "<br>"),
                    }}
                  ></div>
                </div>
              </div>
              <div className="mt-[32px] flex space-x-[32px] ">
                <div className="bg-white p-[32px] rounded-[24px] flex-1 min-w-0">
                  <div className="text-secondary text-20M ">工作坊</div>
                  <div className="mt-[24px] text-black text-[15px] leading-[28px] font-[500] ">
                    {editorRule.editor7}
                  </div>
                  <div
                    className=" mt-[16px] text-black text-[15px] leading-[28px] font-[400] "
                    dangerouslySetInnerHTML={{
                      __html: editorRule.editor8.replace(/\n/g, "<br>"),
                    }}
                  ></div>
                </div>
                <div className="bg-white p-[32px] rounded-[24px] flex-1 min-w-0">
                  <div className="text-secondary text-20M ">
                    Excell﻿ence in Teaching Talk（EIT Talk）
                  </div>
                  <div className="mt-[24px] text-black text-[15px] leading-[28px] font-[500] ">
                    {editorRule.editor9}
                  </div>
                  <div
                    className=" mt-[16px] text-black text-[15px] leading-[28px] font-[400] "
                    dangerouslySetInnerHTML={{
                      __html: editorRule.editor10.replace(/\n/g, "<br>"),
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-8">
              <div className="flex space-x-[32px] ">
                <input
                  type="text"
                  placeholder="各場次"
                  value={editorRule.editor1}
                  onChange={(e) =>
                    handleEditorChange3("editor1", e.target.value)
                  }
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                />
                <input
                  type="text"
                  placeholder="各場次"
                  value={editorRule.editor3}
                  onChange={(e) =>
                    handleEditorChange3("editor3", e.target.value)
                  }
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                />
              </div>
              <div className="flex space-x-[32px] ">
                <textarea
                  type="text"
                  placeholder=""
                  value={editorRule.editor2}
                  onChange={(e) =>
                    handleEditorChange3("editor2", e.target.value)
                  }
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 min-h-[200px]"
                />
                <textarea
                  type="text"
                  placeholder=""
                  value={editorRule.editor4}
                  onChange={(e) =>
                    handleEditorChange3("editor4", e.target.value)
                  }
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 min-h-[200px]"
                />
              </div>
              <input
                type="text"
                placeholder="每場次"
                value={editorRule.editor5}
                onChange={(e) => handleEditorChange3("editor5", e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
              />
              <textarea
                type="text"
                placeholder=""
                value={editorRule.editor6}
                onChange={(e) => handleEditorChange3("editor6", e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 min-h-[200px]"
              />
              <div className="flex space-x-[32px] ">
                <input
                  type="text"
                  placeholder="各場次"
                  value={editorRule.editor7}
                  onChange={(e) =>
                    handleEditorChange3("editor7", e.target.value)
                  }
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                />
                <input
                  type="text"
                  placeholder="各場次"
                  value={editorRule.editor9}
                  onChange={(e) =>
                    handleEditorChange3("editor9", e.target.value)
                  }
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                />
              </div>
              <div className="flex space-x-[32px] ">
                <textarea
                  type="text"
                  placeholder=""
                  value={editorRule.editor8}
                  onChange={(e) =>
                    handleEditorChange3("editor8", e.target.value)
                  }
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 min-h-[200px]"
                />
                <textarea
                  type="text"
                  placeholder=""
                  value={editorRule.editor10}
                  onChange={(e) =>
                    handleEditorChange3("editor10", e.target.value)
                  }
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 min-h-[200px]"
                />
              </div>
            </div>
          </div>
        </div>
        {/* 區塊四 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between items-center">
            <div>區塊四 線上報名與規則</div>
            <div className="flex items-center gap-2">
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
          </div>
          <div
            ref={contentRef4}
            className="  overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height4}px` }}
          >
            <div className="w-full">
              <div className="mt-[24px] text-16R text-[#252F38B2]  ">
                {editorOnline.editor1}
              </div>
              <div className="mt-[32px] flex space-x-[32px]">
                <div className="bg-white p-[32px] rounded-[24px] flex-1 min-w-0">
                  <div className="text-secondary text-36R ">
                    線上​報名表單​​
                  </div>
                  <div className="mt-[32px] max-w-[408px] h-[142px]">
                    <div className="text-black text-16R ">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: editorOnline.editor2,
                        }}
                      />
                    </div>
                  </div>
                  <div className=" mt-[32px] text-[#252F3880] text-16R ">
                    最後更新時間：{editorOnline.editor4}
                  </div>
                </div>
                <div className="bg-white p-[32px] rounded-[24px] flex-1 min-w-0">
                  <div className="text-secondary text-36R ">
                    一般與會者 <br />
                    報名成功名單
                  </div>
                  <div className="mt-[32px] h-[90px]">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: editorOnline.editor3,
                      }}
                    />
                  </div>
                  <div className=" mt-[32px] text-[#252F3880] text-16R ">
                    最後更新時間：{editorOnline.editor5}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-8">
              <input
                type="text"
                placeholder="線上報名規則"
                value={editorOnline.editor1}
                onChange={(e) => handleEditorChange4("editor1", e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 h-[50px]"
              />
              <div className="flex space-x-[32px] min-h-[250px]">
                <div className="w-1/2 h-full">
                  <CustomEditor
                    onContentChange={(content) =>
                      handleEditorChange4("editor2", content)
                    }
                  />
                </div>
                <div className="w-1/2 h-full">
                  <CustomEditor
                    onContentChange={(content) =>
                      handleEditorChange4("editor3", content)
                    }
                  />
                </div>
              </div>
              <div className="flex space-x-[32px] ">
                <input
                  type="text"
                  placeholder="更新時間"
                  value={editorOnline.editor4}
                  onChange={(e) =>
                    handleEditorChange4("editor4", e.target.value)
                  }
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                />
                <input
                  type="text"
                  placeholder="更新時間"
                  value={editorOnline.editor5}
                  onChange={(e) =>
                    handleEditorChange4("editor5", e.target.value)
                  }
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                />
              </div>
            </div>
          </div>
        </div>
        {/* 區塊五 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between items-center">
            <div>交通</div>
            <div className="flex items-center gap-2">
              <Image
                src="/icons/24icon/arrow_right.svg"
                className={`cursor-pointer transition-transform duration-300 ${
                  isOpen5 ? "rotate-90" : ""
                }`}
                width={24}
                height={24}
                alt="arrow"
                onClick={() => setIsOpen5(!isOpen5)}
              />
            </div>
          </div>
          <div
            ref={contentRef5}
            className="  overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height5}px` }}
          >
            <div className="flex flex-col gap-3 mt-5">
              <span
                dangerouslySetInnerHTML={{
                  __html: editorTransportation,
                }}
              />
              <CustomEditor
                onContentChange={(content) => setEditorTransportation(content)}
              />
            </div>
          </div>
        </div>
        {/* 區塊六 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between items-center">
            <div>住宿</div>
            <div className="flex items-center gap-2">
              <Image
                src="/icons/24icon/arrow_right.svg"
                alt="arrow"
                width={24}
                height={24}
                className={`cursor-pointer transition-transform duration-300 ${
                  isOpen6 ? "rotate-90" : ""
                }`}
                onClick={() => setIsOpen6(!isOpen6)}
              />
            </div>
          </div>
          <div
            ref={contentRef6}
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height6}px` }}
          >
            {/* 卡片呈現區 */}
            <div className="mt-[16px] grid grid-cols-3 gap-[16px]">
              {accommodations.map((item, index) => (
                <div key={index} className="bg-white rounded-[24px]">
                  {item.image && (
                    <div>
                      <Image
                        src={item.image}
                        alt={`image${index}`}
                        width={304}
                        height={200}
                        style={{ objectFit: "cover", width: "100%" }}
                        className="rounded-t-[24px]"
                      />
                    </div>
                  )}
                  {/* 卡片右上角的刪除按鈕 */}
                  <button
                    onClick={() => handleDeleteAccommodation(index)}
                    className=" bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    刪除
                  </button>
                  <div className="p-[32px] flex flex-col space-y-[36px]">
                    <div>
                      <div className="text-secondary text-20M">
                        {item.title}
                      </div>
                      <Link
                        href={item.url}
                        className="text-blue-500 underline text-16R break-all mt-[4px]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.url}
                      </Link>
                    </div>
                    <div className="border w-full border-[#252F381A]" />
                    <div>
                      <div className="text-[#252F3880] text-14R">地址</div>
                      <div className="mt-[8px] text-black text-16R">
                        {item.location}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#252F3880] text-14R">電話</div>
                      <div className="mt-[8px] text-black text-16R">
                        {item.phone}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#252F3880] text-14R">地圖</div>
                      <div className="mt-[8px] text-black text-16R">
                        {item.map}
                      </div>
                    </div>
                    <div>
                      <div className="text-[#252F3880] text-14R">
                        飯店預定表格
                      </div>
                      <Link
                        href={item.form}
                        className="text-blue-500 underline text-16R break-all mt-[4px]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.form}
                      </Link>
                    </div>
                    <div className="p-[16px] rounded-[16px] bg-[#0DC7AB0D]">
                      <div className="text-secondary text-16R">
                        {item.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 編輯區，每個住宿卡片對應一組編輯欄位 */}
            <div className="grid grid-cols-3 gap-[16px] mt-6">
              {accommodations.map((item, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <ImageUploader
                    onImageUpload={(filename) =>
                      handleImageUpload(index, { fileUrl: filename })
                    }
                  />
                  <input
                    type="text"
                    placeholder="標題"
                    value={item.title}
                    onChange={(e) =>
                      handleInputChange(index, "title", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                  <input
                    type="text"
                    placeholder="連結網址"
                    value={item.url}
                    onChange={(e) =>
                      handleInputChange(index, "url", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                  <input
                    type="text"
                    placeholder="地址"
                    value={item.location}
                    onChange={(e) =>
                      handleInputChange(index, "location", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                  <input
                    type="text"
                    placeholder="電話"
                    value={item.phone}
                    onChange={(e) =>
                      handleInputChange(index, "phone", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                  <input
                    type="text"
                    placeholder="地圖"
                    value={item.map}
                    onChange={(e) =>
                      handleInputChange(index, "map", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                  <input
                    type="text"
                    placeholder="飯店預定表格連結"
                    value={item.form}
                    onChange={(e) =>
                      handleInputChange(index, "form", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                  <input
                    type="text"
                    placeholder="內容"
                    value={item.content}
                    onChange={(e) =>
                      handleInputChange(index, "content", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
              ))}
            </div>

            {/* 新增住宿卡片按鈕 */}
            <div className="mt-6">
              <button
                onClick={addAccommodation}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                新增住宿卡片
              </button>
            </div>
          </div>
        </div>

        {/* 區塊七 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between items-center">
            <div>會議平面圖</div>
            <div className="flex items-center gap-2">
              <Image
                src="/icons/24icon/arrow_right.svg"
                className={`cursor-pointer transition-transform duration-300 ${
                  isOpen7 ? "rotate-90" : ""
                }`}
                width={24}
                height={24}
                alt="arrow"
                onClick={() => setIsOpen7(!isOpen7)}
              />
            </div>
          </div>
          <div
            ref={contentRef7}
            className="  overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height7}px` }}
          >
            <div className="flex flex-col gap-3 mt-5">
              <div className="w-[300px] h-[300px]">
                {editorMapImage && (
                  <Image
                    src={editorMapImage}
                    alt="logo"
                    width={1920}
                    height={1080}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
              </div>
              <ImageUploader
                onImageUpload={(filename) =>
                  handleImageUpload3({ fileUrl: filename })
                }
              />
            </div>
          </div>
        </div>
      </div>
      {/* 更新按鈕 */}
      <div className="mt-6">
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          更新資料
        </button>
      </div>
    </div>
  );
};
