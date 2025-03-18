import React from "react";

export const VideoPlayer = ({ src, small }) => {
  if (!src) return null;
  return (
    <div>
      {small ? (
        <video width="1200" className="rounded-[40px]" controls={false}>
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <video width="1200" className="rounded-[40px]" controls>
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
};
