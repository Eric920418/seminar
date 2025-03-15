import Image from "next/Image";

export const Map = () => {
  return (
    <div className="flex flex-1 flex-col justify-start max-w-[976px]">
      <div className="text-16M text-primary ">Venue Map</div>
      <div className="relative w-fit">
        <div className="text-black text-48M  relative z-10">會議平面圖</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>

      <div className="mt-[64px]">
        <Image
          className=" rounded-[8px]"
          src="/banner/Rectangle 235.png"
          width={976}
          height={669}
          alt="map"
        ></Image>
      </div>
    </div>
  );
};
