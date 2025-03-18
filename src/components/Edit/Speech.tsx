"use client";
import dynamic from "next/dynamic";

const CustomEditor = dynamic(() => import("@/components/CustomEditor"), {
  ssr: false,
});
export const Speech = () => {
  return (
    <div>
      Speech <CustomEditor />
    </div>
  );
};
