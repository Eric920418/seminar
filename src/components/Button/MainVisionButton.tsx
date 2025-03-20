"use client";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
export const MainVisionButton = ({ url }) => {
  const router = useRouter();
  const handOnClick = () => {
    router.push(url);
  };

  return (
    <Button
      text="會議議程"
      textSize="text-20M"
      textColor="text-white"
      bgColor="bg-black"
      padding="p-[24px_32px_24px_32px]"
      src="/button/arrow_right_2.svg"
      onClick={handOnClick}
    ></Button>
  );
};
