"use client";
import { gql } from "graphql-tag";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ImageUploader } from "@/components/Admin/ImageUploader";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { graphqlRequest } from "@/utils/graphqlClient";

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

interface CardType {
  date: string;
  content: string;
}

interface AccommodationType {
  image: string;
  title: string;
  url: string;
  location: string;
  phone: string;
  map: string;
  form: string;
  content: string;
}

interface UploadResponse {
  imageUrl: string;
}

interface UpdateMeetingResult {
  updateMeetingPage: {
    section1: {
      editorCards: CardType[];
    };
  };
  errors: {
    message: string;
  }[];
}

export const Meeting = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
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

  const [isOpen8, setIsOpen8] = useState(false);
  const [height8, setHeight8] = useState(0);
  const contentRef8 = useRef<HTMLDivElement>(null);

  const [isOpen9, setIsOpen9] = useState(false);
  const [height9, setHeight9] = useState(0);
  const contentRef9 = useRef<HTMLDivElement>(null);

  const [isOpen10, setIsOpen10] = useState(false);
  const [height10, setHeight10] = useState(0);
  const contentRef10 = useRef<HTMLDivElement>(null);

  const [isOpen11, setIsOpen11] = useState(false);
  const [height11, setHeight11] = useState(0);
  const contentRef11 = useRef<HTMLDivElement>(null);

  const [editorCards, setEditorCards] = useState<CardType[]>([]);
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
  });

  const [editorOnline, setEditorOnline] = useState({
    editor1: "",
    editor2: "",
    editor3: "",
    editor4: "",
    editor5: "",
  });

  const [editorTransportation, setEditorTransportation] = useState("");

  const [accommodations, setAccommodations] = useState<AccommodationType[]>([]);

  const [editorMapImage, setEditorMapImage] = useState("");

  const [editorOrigin, setEditorOrigin] = useState("");

  const [editorPurpose, setEditorPurpose] = useState("");

  const [editorActivity, setEditorActivity] = useState("");

  const [editorBackground, setEditorBackground] = useState("");

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
      setEditorOrigin(data.meetingPage[0].section7?.content);
      setEditorPurpose(data.meetingPage[0].section7?.content2);
      setEditorActivity(data.meetingPage[0].section7?.content3);
      setEditorBackground(data.meetingPage[0].section7?.content4);
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

  useEffect(() => {
    if (contentRef8.current) {
      setHeight8(isOpen8 ? contentRef8.current.scrollHeight : 0);
    }
  }, [isOpen8, editorOrigin]);

  useEffect(() => {
    if (contentRef9.current) {
      setHeight9(isOpen9 ? contentRef9.current.scrollHeight : 0);
    }
  }, [isOpen9, editorPurpose]);

  useEffect(() => {
    if (contentRef10.current) {
      setHeight10(isOpen10 ? contentRef10.current.scrollHeight : 0);
    }
  }, [isOpen10, editorActivity]);

  useEffect(() => {
    if (contentRef11.current) {
      setHeight11(isOpen11 ? contentRef11.current.scrollHeight : 0);
    }
  }, [isOpen11, editorBackground]);

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

  const handleImageUpload = (index: number, data: UploadResponse) => {
    handleInputChange(index, "image", data.imageUrl);
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

  const handleInputChange = (index: number, key: string, value: string) => {
    const newAccommodations = accommodations.map((item, idx) =>
      idx === index ? { ...item, [key]: value } : item
    );
    setAccommodations(newAccommodations);
  };

  const handleDeleteAccommodation = (index: number) => {
    const updatedAccommodations = accommodations.filter(
      (_, idx) => idx !== index
    );
    setAccommodations(updatedAccommodations);
  };

  const handleImageUpload3 = (data: UploadResponse) => {
    console.log(data.imageUrl);
    setEditorMapImage(data.imageUrl);
  };

  const handleEditorOrigin = (content: string) => {
    setEditorOrigin(content);
  };

  const handleEditorPurpose = (content: string) => {
    setEditorPurpose(content);
  };

  const handleEditorActivity = (content: string) => {
    setEditorActivity(content);
  };

  const handleEditorBackground = (data: UploadResponse) => {
    setEditorBackground(data.imageUrl);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
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
        content: editorOrigin,
        content2: editorPurpose,
        content3: editorActivity,
        content4: editorBackground,
      },
    };

    try {
      const response = await graphqlRequest<UpdateMeetingResult>(
        UPDATE_PAGE.loc?.source.body || "",
        { input },
        session
      );
      if (response.errors) {
        console.error("更新失敗:", JSON.stringify(response.errors, null, 2));
      }
    } catch (err) {
      console.error("更新失敗:", err);
    } finally {
      alert("更新成功");
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mb-3"></div>
            <p className="text-gray-700">資料處理中，請稍候...</p>
          </div>
        </div>
      )}

      <div className="text-32M mb-6">ICTE會議資訊</div>
      <div className="flex flex-col gap-[16px]">
        {/* 區塊十一 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between items-center">
            <div>背景圖片</div>
            <div className="flex items-center gap-2">
              <Image
                src="/icons/24icon/arrow_right.svg"
                className={`cursor-pointer transition-transform duration-300 ${
                  isOpen11 ? "rotate-90" : ""
                }`}
                width={24}
                height={24}
                alt="arrow"
                onClick={() => setIsOpen11(!isOpen11)}
              />
            </div>
          </div>
          <div
            ref={contentRef11}
            className=" overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height11}px` }}
          >
            <div className="w-full">
              {editorBackground && editorBackground.trim() !== "" && (
                <Image
                  src={editorBackground}
                  alt="會議背景"
                  width={100}
                  height={100}
                />
              )}
            </div>
            <div className="w-full">
              <ImageUploader
                onImageUpload={handleEditorBackground}
              />
            </div>
          </div>
        </div>
        {/* 區塊八 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between items-center">
            <div>緣起</div>
            <div className="flex items-center gap-2">
              <Image
                src="/icons/24icon/arrow_right.svg"
                className={`cursor-pointer transition-transform duration-300 ${
                  isOpen8 ? "rotate-90" : ""
                }`}
                width={24}
                height={24}
                alt="arrow"
                onClick={() => setIsOpen8(!isOpen8)}
              />
            </div>
          </div>
          <div
            ref={contentRef8}
            className=" overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height8}px` }}
          >
            <div className="w-full">
              <div className="text-black text-20M">
                <span dangerouslySetInnerHTML={{ __html: editorOrigin }} />
              </div>
            </div>
            <div className="w-full">
              <CustomEditor
                placeholder="緣起"
                onContentChange={(content) => handleEditorOrigin(content)}
              />
            </div>
          </div>
        </div>
        {/* 區塊九 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between items-center">
            <div>目的</div>
            <div className="flex items-center gap-2">
              <Image
                src="/icons/24icon/arrow_right.svg"
                className={`cursor-pointer transition-transform duration-300 ${
                  isOpen9 ? "rotate-90" : ""
                }`}
                width={24}
                height={24}
                alt="arrow"
                onClick={() => setIsOpen9(!isOpen9)}
              />
            </div>
          </div>
          <div
            ref={contentRef9}
            className=" overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height9}px` }}
          >
            <div className="w-full">
              <div className="text-black text-20M">
                <span dangerouslySetInnerHTML={{ __html: editorPurpose }} />
              </div>
            </div>
            <div className="w-full">
              <CustomEditor
                placeholder="目的"
                onContentChange={(content) => handleEditorPurpose(content)}
              />
            </div>
          </div>
        </div>
        {/* 區塊十 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between items-center">
            <div>活動類型</div>
            <div className="flex items-center gap-2">
              <Image
                src="/icons/24icon/arrow_right.svg"
                className={`cursor-pointer transition-transform duration-300 ${
                  isOpen10 ? "rotate-90" : ""
                }`}
                width={24}
                height={24}
                alt="arrow"
                onClick={() => setIsOpen10(!isOpen10)}
              />
            </div>
          </div>
          <div
            ref={contentRef10}
            className=" overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: `${height10}px` }}
          >
            <div className="w-full">
              <div className="text-black text-20M">
                <span dangerouslySetInnerHTML={{ __html: editorActivity }} />
              </div>
            </div>
            <div className="w-full">
              <CustomEditor
                placeholder="活動類型"
                onContentChange={(content) => handleEditorActivity(content)}
              />
            </div>
          </div>
        </div>
        {/* 區塊一 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between items-center">
            <div>會議議程</div>
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
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded my-2"
                    onClick={() => DeleteCard(index)}
                  >
                    刪除卡片
                  </button>
                  <div className="space-y-1">
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

                  <div className="my-[15px]   bg-white space-y-1">
                    <div className=" text-black text-20R ">
                      <span
                        dangerouslySetInnerHTML={{ __html: card.content }}
                      />
                    </div>
                  </div>
                  <div className="mt-[15px]">
                    <CustomEditor
                      placeholder="議程"
                      onContentChange={(content) =>
                        handleCardChange(index, "content", content)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* 區塊二 */}
        <div className="relative bg-gray-200 w-full p-3">
          <div className="flex justify-between items-center">
            <div>重要時程</div>
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
                  placeholder="徵稿日期"
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
                  <div className="text-black text-20M">會議主會場</div>
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
            <div>發表規則</div>
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
                  <div className="text-secondary text-20M ">微型工作坊</div>
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
                  placeholder=""
                  value={editorRule.editor2}
                  onChange={(e) =>
                    handleEditorChange3("editor2", e.target.value)
                  }
                  className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 min-h-[200px]"
                />
                <textarea
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
              </div>
              <div className="flex space-x-[32px] ">
                <textarea
                  placeholder=""
                  value={editorRule.editor8}
                  onChange={(e) =>
                    handleEditorChange3("editor8", e.target.value)
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
            <div>線上報名與規則</div>
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
                  <div className="text-secondary text-36R ">報名注意事項</div>
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
                    placeholder="線上報名表單"
                    onContentChange={(content) =>
                      handleEditorChange4("editor2", content)
                    }
                  />
                </div>
                <div className="w-1/2 h-full">
                  <CustomEditor
                    placeholder="報名成功名單"
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
                placeholder="會議主會場"
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
                  {item.image && item.image.trim() !== "" && (
                    <div>
                      <Image
                        src={item.image}
                        alt={`image${index}`}
                        width={304}
                        height={200}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "200px",
                        }}
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
                    onImageUpload={(data) =>
                      handleImageUpload(index, data)
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
                {editorMapImage && typeof editorMapImage === 'string' && editorMapImage.trim() !== "" && (
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
                onImageUpload={handleImageUpload3}
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
