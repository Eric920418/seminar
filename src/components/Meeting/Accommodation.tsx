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
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      setAccommodations(data.meetingPage[0].section6);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-1 flex-col justify-start desktop:max-w-[976px]  px-3 desktop:px-0">
      <div className="text-16M text-primary ">Accommodation</div>
      <div className="relative w-fit">
        <div className="text-black text-48M  relative z-10">住宿</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>

      <div className="mt-[64px] grid grid-cols-1 desktop:grid-cols-3 gap-6  space-x-[32px]">
        {accommodations.map((item, index) => (
          <div key={index} className="bg-white rounded-[24px] w-full">
            {item.image ? (
              <Image
                className="rounded-t-[24px]"
                src={item.image}
                style={{ objectFit: "cover", width: "100%", height: "200px" }}
                width={1920}
                height={1080}
                alt={item.title}
              />
            ) : null}

            <div className="p-[32px] flex flex-col space-y-[36px] ">
              <div>
                <div className="text-secondary text-20M ">{item.title}</div>
                <Link
                  href={item.url}
                  className="text-blue-500 underline text-16R  break-all mt-[4px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.url}
                </Link>
              </div>
              <div className="border w-full border-[#252F381A] "></div>
              <div>
                <div className="text-[#252F3880] text-14R ">地址​</div>
                <div className="mt-[8px] text-black text-16R ">
                  {item.location}
                </div>
              </div>
              <div>
                <div className="text-[#252F3880] text-14R ">電話​​</div>
                <div className="mt-[8px] text-black text-16R ">
                  {item.phone}
                </div>
              </div>
              <div>
                <div className="text-[#252F3880] text-14R ">地圖​</div>
                <div className="mt-[8px] text-black text-16R ">
                  <Link
                    href={item.map}
                    className="text-blue-500 underline text-16R  break-all mt-[4px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.map}
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-[#252F3880] text-14R ">飯店預定表格​</div>
                <Link
                  href={item.form}
                  className="text-blue-500 underline text-16R  break-all mt-[4px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.form}
                </Link>
              </div>
              <div className="p-[16px] rounded-[16px] bg-[#0DC7AB0D]">
                <div className="text-secondary text-16R ">{item.content}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
