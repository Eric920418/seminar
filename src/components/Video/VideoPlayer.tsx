type VideoPlayerProps = {
  src: string;
  small?: boolean; // 改成可選屬性
};
export const VideoPlayer = ({ src, small }: VideoPlayerProps) => {
  if (!src) return null;
  return (
    <div>
      {small ? (
        <div style={{ height: "100%", pointerEvents: "none" }}>
          <iframe
            width="100%"
            style={{ width: "100%", height: "213px", borderRadius: "40px" }}
            src={`https://www.youtube.com/embed/${src}?si=YEACs7k0u1_CezFi`}
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
          src={`https://www.youtube.com/embed/${src}?si=YEACs7k0u1_CezFi`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};
