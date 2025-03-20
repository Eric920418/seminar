"use client";

import { useState } from "react";

export const ImageUploader = ({ onImageUpload }) => {
  const [previewImage, setPreviewImage] = useState(null);

  // 當檔案選擇改變時
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 產生圖片預覽
    const previewURL = URL.createObjectURL(file);
    setPreviewImage(previewURL);

    // 建立 FormData 並附加檔案
    const formData = new FormData();
    formData.append("image", file);

    try {
      // 呼叫 API 上傳檔案
      const res = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("上傳失敗");
        return;
      }

      const data = await res.json();

      onImageUpload(data);
    } catch (error) {
      console.error("上傳錯誤:", error);
    }
  };

  return (
    <div>
      <div className="mt-[64px]">
        {/* {previewImage && (
          <div className="mt-[16px]">
            <img
              src={previewImage}
              alt="預覽圖片"
              style={{ maxWidth: "600px" }}
            />
          </div>
        )} */}
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
