"use client";
import { Button } from "@/components/Button";

export const ConferenceVisionButton = ({ url }) => {
  const handOnClick = () => {
    window.open(url, "_blank");
  };

  return (
    <Button
      text="手冊下載"
      textColor="text-[#252F38B2]"
      textSize="text-16M"
      bgColor="bg-white"
      padding="p-[16px_24px_16px_24px]"
      src="/icons/24icon/download.svg"
      onClick={handOnClick}
    ></Button>
  );
};
