import { useState } from "react";

type VideoPlayerProps = {
  src: string;
  small?: boolean;
};

// 從 YouTube URL 獲取影片縮圖
const getYouTubeThumbnail = (videoId: string) => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

export const VideoPlayer = ({ src, small }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!src) return null;

  // 如果還沒點擊播放,顯示縮圖
  if (!isPlaying) {
    return (
      <div
        className="relative cursor-pointer"
        onClick={() => setIsPlaying(true)}
        style={{
          width: "100%",
          height: small ? "213px" : "675px",
          aspectRatio: "16/9",
          position: "relative",
        }}
      >
        <img
          src={getYouTubeThumbnail(src)}
          alt="Video thumbnail"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "40px",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        {/* 播放按鈕 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-black/80 border-b-8 border-b-transparent ml-1"></div>
          </div>
        </div>
      </div>
    );
  }

  // 點擊後載入真正的 YouTube player
  return (
    <div>
      {small ? (
        <div style={{ height: "100%", pointerEvents: "none" }}>
          <iframe
            width="100%"
            style={{ width: "100%", height: "213px", borderRadius: "40px" }}
            src={`https://www.youtube.com/embed/${src}?si=YEACs7k0u1_CezFi&autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <iframe
          width="100%"
          height="100%"
          style={{ width: "100%", height: "675px", borderRadius: "40px" }}
          src={`https://www.youtube.com/embed/${src}?si=YEACs7k0u1_CezFi&autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};
