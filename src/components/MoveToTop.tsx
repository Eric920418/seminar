import React from "react";

export const MoveToTop = () => {
  return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="bg-[#FFFFFF80] text-black px-4 py-2 rounded-full hover:bg-[#FFFFFFB2] transition-all duration-300 ease-in-out cursor-pointer"
      >
        Top
      </button>
    </div>
  );
};
