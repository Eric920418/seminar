"use client";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

type TimeVisionButtonProps = {
  url: string;
  text: string;
  textColor?: string;
  textSize?: string;
  bgColor?: string;
  padding?: string;
  src?: string;
};

export const TimeVisionButton = ({
  url = "/meeting",
  text = "論文格式與規則",
  textColor = "text-white",
  textSize = "text-16M",
  bgColor = "bg-third",
  padding = "p-[16px_24px_16px_24px]",
  src = "/button/arrow_right_2.svg",
}: TimeVisionButtonProps) => {
  const router = useRouter();
  const handOnClick = () => {
    router.push(url);
  };

  return (
    <Button
      text={text}
      textSize={textSize}
      textColor={textColor}
      bgColor={bgColor}
      padding={padding}
      src={src}
      onClick={handOnClick}
    />
  );
};
