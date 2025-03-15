import Image from "next/Image";
import Link from "next/link";
export const Accommodation = () => {
  const card = [
    {
      src: "/banner/img.png",
      title: "台北福華大飯店",
      link: "https://www.moxytaichung.com/",
      addr: "10644 台北市大安區和平東路一段147號",
      phone: "+886-4-3600-7000",
      map: "10644 台北市大安區和平東路一段147號",
      formSrc: "https://bit.ly/4cvFmAp",
      context: "走路​​到國立台北教育大學只要8分鐘！",
    },
    {
      src: "/banner/img2.png",
      title: "台北福華大飯店",
      link: "https://www.moxytaichung.com/",
      addr: "10644 台北市大安區和平東路一段147號",
      phone: "+886-4-3600-7000",
      map: "10644 台北市大安區和平東路一段147號",
      formSrc: "https://bit.ly/4cvFmAp",
      context: "走路​​到國立台北教育大學只要8分鐘！",
    },
    {
      src: "/banner/img3.png",
      title: "台北福華大飯店",
      link: "https://www.moxytaichung.com/",
      addr: "10644 台北市大安區和平東路一段147號",
      phone: "+886-4-3600-7000",
      map: "10644 台北市大安區和平東路一段147號",
      formSrc: "https://bit.ly/4cvFmAp",
      context: "走路​​到國立台北教育大學只要8分鐘！",
    },
  ];

  return (
    <div className="flex flex-1 flex-col justify-start max-w-[976px]">
      <div className="text-16M text-primary ">Accommodation</div>
      <div className="relative w-fit">
        <div className="text-black text-48M  relative z-10">住宿</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>

      <div className="mt-[64px] text-secondary text-20M ">飯店資訊​​</div>
      <div className="mt-[64px] flex space-x-[32px]">
        {card.map((item, index) => (
          <div key={index} className="bg-white rounded-[24px]">
            <Image
              className="rounded-t-[24px]"
              src={item.src}
              width={304}
              height={200}
              alt={item.title}
            />
            <div className="p-[32px] flex flex-col space-y-[36px] ">
              <div>
                <div className="text-secondary text-20M ">{item.title}</div>
                <Link
                  href={item.link}
                  className="text-blue-500 underline text-16R  break-all mt-[4px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.link}
                </Link>
              </div>
              <div className="border w-full border-[#252F381A] "></div>
              <div>
                <div className="text-[#252F3880] text-14R ">地址​</div>
                <div className="mt-[8px] text-black text-16R ">{item.addr}</div>
              </div>
              <div>
                <div className="text-[#252F3880] text-14R ">電話​​</div>
                <div className="mt-[8px] text-black text-16R ">
                  {item.phone}
                </div>
              </div>
              <div>
                <div className="text-[#252F3880] text-14R ">地圖​</div>
                <div className="mt-[8px] text-black text-16R ">{item.map}</div>
              </div>
              <div>
                <div className="text-[#252F3880] text-14R ">飯店預定表格​</div>
                <Link
                  href={item.formSrc}
                  className="text-blue-500 underline text-16R  break-all mt-[4px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.formSrc}
                </Link>
              </div>
              <div className="p-[16px] rounded-[16px] bg-[#0DC7AB0D]">
                <div className="text-secondary text-16R ">{item.context}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
