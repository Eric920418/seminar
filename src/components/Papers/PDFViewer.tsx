"use client";
import dynamic from "next/dynamic";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// 動態匯入 Viewer，關閉 SSR
const DynamicViewer = dynamic(
  () => import("@react-pdf-viewer/core").then((mod) => mod.Viewer),
  { ssr: false }
);

export const PDFViewer = ({ src }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div style={{ height: "583px" }}>
      {/* Worker 直接載入，不需要 dynamic */}
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js" />

      <DynamicViewer
        fileUrl={`/uploads/${src}.pdf`}
        plugins={[defaultLayoutPluginInstance]}
      />
    </div>
  );
};
