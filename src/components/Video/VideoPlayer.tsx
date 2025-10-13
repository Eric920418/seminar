type VideoPlayerProps = {
  src: string;
  small?: boolean; // 改成可選屬性
};

// 處理 YouTube 網址，支援完整網址或影片 ID
const getEmbedUrl = (src: string): string => {
  // 如果已經是 embed 網址，直接返回
  if (src.includes('youtube.com/embed/')) {
    return src;
  }

  // 如果是完整的 YouTube 網址，提取影片 ID
  if (src.includes('youtube.com/watch') || src.includes('youtu.be/') || src.includes('youtube.com/live/')) {
    try {
      const url = new URL(src);
      let videoId = '';

      if (url.hostname.includes('youtu.be')) {
        // 處理短網址 youtu.be/VIDEO_ID
        videoId = url.pathname.slice(1);
      } else if (url.hostname.includes('youtube.com')) {
        if (url.pathname.includes('/live/')) {
          // 處理直播網址 youtube.com/live/VIDEO_ID
          videoId = url.pathname.split('/live/')[1] || '';
        } else {
          // 處理標準網址 youtube.com/watch?v=VIDEO_ID
          videoId = url.searchParams.get('v') || '';
        }
      }

      return `https://www.youtube.com/embed/${videoId}?si=YEACs7k0u1_CezFi`;
    } catch {
      // 如果解析失敗，假設是影片 ID
      return `https://www.youtube.com/embed/${src}?si=YEACs7k0u1_CezFi`;
    }
  }

  // 如果只是影片 ID，組合成完整網址
  return `https://www.youtube.com/embed/${src}?si=YEACs7k0u1_CezFi`;
};

export const VideoPlayer = ({ src, small }: VideoPlayerProps) => {
  if (!src || typeof window === "undefined") {
    return (
      <div className="flex justify-center items-center h-full">敬請期待</div>
    );
  }

  const embedUrl = getEmbedUrl(src);

  return (
    <div>
      {small ? (
        <div style={{ height: "100%", pointerEvents: "none" }}>
          <iframe
            width="100%"
            style={{ width: "100%", height: "213px", borderRadius: "40px" }}
            src={embedUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="h-[500px] laptop:h-[675px]">
          <iframe
            width="100%"
            height="100%"
            style={{ width: "100%", borderRadius: "40px" }}
            src={embedUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};
