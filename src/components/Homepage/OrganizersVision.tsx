export const OrganizersVision = () => {
  const card = [
    { title: "主辦單位", content: "中華民國（台灣）教育部" },
    { title: "承辦單位", content: "國立臺北教育大學課程與教學傳播科技研究所" },
    {
      title: "協辦單位",
      content:
        "國立臺北教育大學師資培育處、國立臺北教育大學教育學院、臺灣教育傳播暨科技學會",
    },
  ];

  return (
    <div className="w-full  pt-[128px] pb-[160px]">
      <div className="w-[1312px] mx-auto flex items-center space-x-[64px]">
        <div className="w-[608px] flex flex-col items-start">
          <div className="text-16M text-primary ">Organizers</div>
          <div className="relative w-fit">
            <div className="text-black text-48M  relative z-10">會議​​組成</div>
            <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
          </div>
        </div>
        <div className="bg-[#FFFFFF] rounded-[40px] p-[32px] flex flex-col gap-[8px]">
          {card.map((item, index) => (
            <div
              key={index}
              className="bg-[#0DC7AB0D] w-[576px] p-[16px] rounded-[20px]"
            >
              <div className="text-secondary text-16M ">{item.title}</div>
              <div className="text-black text-16R  mt-[8px]">
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
