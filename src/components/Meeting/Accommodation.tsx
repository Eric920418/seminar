"use client";
import { useState, useEffect } from "react";
const query = `
  query meetingPage {
    meetingPage {
      section6
    }
  }
`;
import Image from "next/Image";
import Link from "next/link";
export const Accommodation = () => {
  const [editorStay, setEditorStay] = useState({
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
    editor21: "",
    editor22: "",
    editor23: "",
    editor24: "",
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      setEditorStay({
        editor1: data.meetingPage[0].section6[0].image || "",
        editor2: data.meetingPage[0].section6[0].title || "",
        editor3: data.meetingPage[0].section6[0].url || "",
        editor4: data.meetingPage[0].section6[0].location || "",
        editor5: data.meetingPage[0].section6[0].phone || "",
        editor6: data.meetingPage[0].section6[0].map || "",
        editor7: data.meetingPage[0].section6[0].form || "",
        editor8: data.meetingPage[0].section6[0].content || "",
        editor9: data.meetingPage[0].section6[1].image || "",
        editor10: data.meetingPage[0].section6[1].title || "",
        editor11: data.meetingPage[0].section6[1].url || "",
        editor12: data.meetingPage[0].section6[1].location || "",
        editor13: data.meetingPage[0].section6[1].phone || "",
        editor14: data.meetingPage[0].section6[1].map || "",
        editor15: data.meetingPage[0].section6[1].form || "",
        editor16: data.meetingPage[0].section6[1].content || "",
        editor17: data.meetingPage[0].section6[2].image || "",
        editor18: data.meetingPage[0].section6[2].title || "",
        editor19: data.meetingPage[0].section6[2].url || "",
        editor20: data.meetingPage[0].section6[2].location || "",
        editor21: data.meetingPage[0].section6[2].phone || "",
        editor22: data.meetingPage[0].section6[2].map || "",
        editor23: data.meetingPage[0].section6[2].form || "",
        editor24: data.meetingPage[0].section6[2].content || "",
      });
    }
    fetchData();
  }, []);
  const card = [
    {
      src: editorStay.editor1,
      title: editorStay.editor2,
      link: editorStay.editor3,
      addr: editorStay.editor4,
      phone: editorStay.editor5,
      map: editorStay.editor6,
      formSrc: editorStay.editor7,
      context: editorStay.editor8,
    },
    {
      src: editorStay.editor9,
      title: editorStay.editor10,
      link: editorStay.editor11,
      addr: editorStay.editor12,
      phone: editorStay.editor13,
      map: editorStay.editor14,
      formSrc: editorStay.editor15,
      context: editorStay.editor16,
    },
    {
      src: editorStay.editor17,
      title: editorStay.editor18,
      link: editorStay.editor19,
      addr: editorStay.editor20,
      phone: editorStay.editor21,
      map: editorStay.editor22,
      formSrc: editorStay.editor23,
      context: editorStay.editor24,
    },
  ];

  return (
    <div className="flex flex-1 flex-col justify-start desktop:max-w-[976px]">
      <div className="text-16M text-primary ">Accommodation</div>
      <div className="relative w-fit">
        <div className="text-black text-48M  relative z-10">住宿</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>

      <div className="mt-[64px] text-secondary text-20M ">飯店資訊​​</div>
      <div className="mt-[64px] flex flex-col gap-6 desktop:flex-row space-x-[32px]">
        {card.map((item, index) => (
          <div key={index} className="bg-white rounded-[24px] w-full">
            {item.src ? (
              <Image
                className="rounded-t-[24px]"
                src={item.src}
                style={{ objectFit: "cover", width: "100%" }}
                width={304}
                height={200}
                alt={item.title}
              />
            ) : null}

            <div className="p-[32px] flex flex-col space-y-[36px] ">
              <div>
                <div className="text-secondary text-20M ">{item.title}</div>
                <Link
                  href={item.link}
                  className="text-blue-500 underline text-16R  break-all mt-[4px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.link}
                </Link>
              </div>
              <div className="border w-full border-[#252F381A] "></div>
              <div>
                <div className="text-[#252F3880] text-14R ">地址​</div>
                <div className="mt-[8px] text-black text-16R ">{item.addr}</div>
              </div>
              <div>
                <div className="text-[#252F3880] text-14R ">電話​​</div>
                <div className="mt-[8px] text-black text-16R ">
                  {item.phone}
                </div>
              </div>
              <div>
                <div className="text-[#252F3880] text-14R ">地圖​</div>
                <div className="mt-[8px] text-black text-16R ">{item.map}</div>
              </div>
              <div>
                <div className="text-[#252F3880] text-14R ">飯店預定表格​</div>
                <Link
                  href={item.formSrc}
                  className="text-blue-500 underline text-16R  break-all mt-[4px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.formSrc}
                </Link>
              </div>
              <div className="p-[16px] rounded-[16px] bg-[#0DC7AB0D]">
                <div className="text-secondary text-16R ">{item.context}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
