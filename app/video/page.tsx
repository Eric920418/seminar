export default function page() {
  return (
    <div className="bg-[#FAFBFD]">
      <div
        className="h-[640px] flex justify-center items-center"
        style={{
          backgroundImage: "url('/banner/Group.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center">
          <div className="text-third text-16M ">Workshop​​</div>
          <div className="text-black text-48M ">影片專區​​​</div>
        </div>
      </div>
      <div className="mx-auto w-fit">
        <div className="text-16M text-primary">Abstract Review Results</div>
        <div className="relative w-fit">
          <div className="text-black text-48M  relative z-10">
            第十二屆師資培育國際學術研討會
          </div>
          <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
        </div>
      </div>
    </div>
  );
}
