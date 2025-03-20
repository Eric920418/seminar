"use client";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
export const TimeVisionButton = ({
  url,
  text,
  textColor,
  textSize,
  bgColor,
  padding,
  src,
}) => {
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
    ></Button>
  );
};
