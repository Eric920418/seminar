"use client";
import dynamic from "next/dynamic";

const CustomEditor = dynamic(() => import("@/components/CustomEditor"), {
  ssr: false,
});
export const Work = () => {
  return (
    <div>
      Work <CustomEditor />
    </div>
  );
};
