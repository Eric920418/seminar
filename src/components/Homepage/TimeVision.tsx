import { Button } from "@/components/Button";

export const TimeVision = () => {
  return (
    <div className="w-full  pt-[128px] pb-[160px]">
      <div className="w-full max-w-[1314px] mx-auto ">
        <div className="text-16M text-primary">NEW</div>
        <div className="relative w-fit">
          <div className="text-black text-48M  relative z-10">重要時刻</div>
          <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
        </div>

        <div className="mt-[64px] flex flex-wrap  justify-start gap-[32px]">
          <div className="bg-[#FFFFFF] p-[32px] rounded-[40px]">
            <div className="w-[48px] h-[48px] rounded-[40px] bg-primary flex justify-center items-center">
              <div className="text-[#FFFFFF] text-20M ">1</div>
            </div>
            <div className="text-black text-36M mt-[16px] ">徵稿</div>
            <div className="mt-[32px] w-[240px] h-[204px]">
              <div className="flex">
                <div className="text-primary text-20M ">
                  2025/1/31&nbsp;~&nbsp;
                </div>
                <div className="line-through text-[#252F3880] text-20M ">
                  5/31
                </div>
              </div>
              <div className="line-through text-[#252F3880] text-20M ">
                延長至 2025/8/10
              </div>
              <div className="line-through text-[#252F3880] text-20M ">
                延長至 2025/8/27
              </div>
              <div className=" text-primary text-20M ">延長至 2025/9/12</div>
            </div>
          </div>
          <div className="bg-[#FFFFFF] p-[32px] rounded-[40px]">
            <div className="w-[48px] h-[48px] rounded-[40px] bg-primary flex justify-center items-center">
              <div className="text-[#FFFFFF] text-20M ">2</div>
            </div>
            <div className="text-black text-36M mt-[16px] ">論文接受通知</div>
            <div className="mt-[32px] w-[240px] h-[204px]">
              <div className=" text-primary text-20M ">2025/6/30</div>
            </div>
          </div>
          <div className="bg-[#FFFFFF] p-[32px] rounded-[40px]">
            <div className="w-[48px] h-[48px] rounded-[40px] bg-primary flex justify-center items-center">
              <div className="text-[#FFFFFF] text-20M ">3</div>
            </div>
            <div className="text-black text-36M mt-[16px] ">論文定稿</div>
            <div className="mt-[32px] w-[240px] h-[117px]">
              <div className=" text-primary text-20M ">2025/9/05</div>
            </div>
            <div className="mt-[32px] w-[240px] ">
              <Button
                text="論文格式與規則"
                textColor="text-white"
                textSize="text-16M"
                bgColor="bg-third"
                padding="p-[16px_24px_16px_24px]"
                src="/button/arrow_right_2.svg"
              />
            </div>
          </div>
          <div className="bg-[#FFFFFF] p-[32px] rounded-[40px]">
            <div className="w-[48px] h-[48px] rounded-[40px] bg-primary flex justify-center items-center">
              <div className="text-[#FFFFFF] text-20M ">4</div>
            </div>
            <div className="text-black text-36M mt-[16px] ">線上報名</div>
            <div className="mt-[32px] w-[240px] h-[117px]">
              <div className=" text-primary text-20M ">2023/09/11~30</div>
            </div>
            <div className="mt-[32px] w-[240px] ">
              <Button
                text="報名費用與規則"
                textColor="text-white"
                textSize="text-16M"
                bgColor="bg-third"
                padding="p-[16px_24px_16px_24px]"
                src="/button/arrow_right_2.svg"
              />
            </div>
          </div>
        </div>
        <div className="mt-[32px] flex space-x-[32px]">
          <div className="bg-[#FFF8DC] p-[32px] rounded-[40px]">
            <div className="text-black text-36M ">會議舉辦日期</div>
            <div className="mt-[32px] flex flex-col gap-[16px]">
              <div className="w-[240px] bg-[#FFEFB0] p-[16px] flex flex-col gap-[4px] rounded-[20px]">
                <div className="text-black text-20M ">會議</div>
                <div className="text-black text-16M ">2025/10/17~18</div>
              </div>
              <div className="w-[240px] bg-[#FFEFB0] p-[16px] flex flex-col gap-[4px] rounded-[20px]">
                <div className="text-black text-20M ">晚宴</div>
                <div className="text-black text-16M ">2025/10/17 19:00</div>
              </div>
            </div>
            <div className="mt-[32px]">
              <Button
                text="交通資訊"
                textColor="text-black"
                textSize="text-16M"
                bgColor="bg-[#FFFFFF]"
                padding="p-[16px_24px_16px_24px]"
                src="/icons/24icon/arrow_right_2.svg"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0 h-[446px] bg-black rounded-[40px]"></div>
        </div>
      </div>
    </div>
  );
};
