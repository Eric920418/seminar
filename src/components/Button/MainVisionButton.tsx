"use client";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

interface ConferenceVisionButtonProps {
  url: string;
}

export const MainVisionButton: React.FC<ConferenceVisionButtonProps> = ({
  url,
}) => {
  const router = useRouter();
  const handOnClick = () => {
    router.push(url);
  };

  return (
    <Button
      text="會議議程"
      textSize="text-14R laptop:text-20M desktop:text-20M"
      textColor="text-white"
      bgColor="bg-black"
      padding="p-[12px_20px_12px_20px] laptop:p-[20px_36px_20px_36px] desktop:p-[20px_36px_20px_36px]"
      src="/button/arrow_right_2.svg"
      onClick={handOnClick}
    ></Button>
  );
};
