"use client";
import dynamic from "next/dynamic";

const CustomEditor = dynamic(() => import("@/components/CustomEditor"), {
  ssr: false,
});
export const Papers = () => {
  return (
    <div>
      Papers <CustomEditor />
    </div>
  );
};
