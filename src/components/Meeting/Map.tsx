"use client";
import { useState, useEffect } from "react";
const query = `
  query meetingPage {
    meetingPage {
      section7
    }
  }
`;
import Image from "next/Image";

export const Map = () => {
  const [editorMapImage, setEditorMapImage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      setEditorMapImage(data.meetingPage[0].section7?.MapUrl);
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-1 flex-col justify-start max-w-[976px]  px-3 desktop:px-0">
      <div className="text-16M text-primary ">Venue Map</div>
      <div className="relative w-fit">
        <div className="text-black text-48M  relative z-10">會議平面圖</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>

      <div className="mt-[64px]">
        {editorMapImage ? (
          <Image
            className=" rounded-[8px]"
            src={editorMapImage}
            width={976}
            height={669}
            alt="map"
          ></Image>
        ) : null}
      </div>
    </div>
  );
};
