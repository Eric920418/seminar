"use client";

import { useEffect, useState } from "react";

const query = `
  query homePage {
    homePage {
      section6 
    }
  }
`;

export const OrganizersVision = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const result = await res.json();
      setData(result.data);
    };

    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="w-full desktop:pt-[128px] pb-[160px]">
      <div className="w-full justify-center flex-row laptop:flex items-center space-x-[64px]">
        <div className="desktop:w-[608px] flex flex-col items-start">
          <div className="text-16M text-primary">Organizers</div>
          <div className="relative w-fit">
            <div className="text-black text-48M relative z-10">會議組成</div>
            <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
          </div>
        </div>
        <div className="bg-[#FFFFFF] rounded-[40px] p-[32px] flex flex-col gap-[8px]">
          {data.homePage[0].section6.map((item, index) => {
            return (
              <div
                key={index}
                className="bg-[#0DC7AB0D] desktop:w-[576px] p-[16px] rounded-[20px]"
              >
                {Object.entries(item).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-secondary text-16M">{key}</div>
                    <div className="text-black text-16R mt-[8px]">{value}</div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
