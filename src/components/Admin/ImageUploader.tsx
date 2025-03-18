"use client";

import { useState } from "react";

export const ImageUploader = ({ onImageUpload }) => {
  const [previewImage, setPreviewImage] = useState(null);

  // 當檔案選擇改變時
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 產生圖片預覽（僅供前端顯示）
    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);

    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const uint8Array = new Uint8Array(arrayBuffer);

      // 構造 JSON 格式（但 data 為 Uint8Array，不是 Base64）
      const jsonData = {
        image: Array.from(uint8Array),
      };

      if (onImageUpload) {
        onImageUpload(jsonData);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <div className="mt-[64px]">
        {previewImage && (
          <div className="mt-[16px]">
            <img
              src={previewImage}
              alt="預覽圖片"
              style={{ maxWidth: "600px" }}
            />
          </div>
        )}
        <input
          className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 mt-[1rem]"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
