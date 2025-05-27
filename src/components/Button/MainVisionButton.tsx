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
      textSize="text-16M"
      textColor="text-white"
      bgColor="bg-black"
      padding="p-[16px_24px_16px_24px]"
      src="/button/arrow_right_2.svg"
      onClick={handOnClick}
    ></Button>
  );
};
