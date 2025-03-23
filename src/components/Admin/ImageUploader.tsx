"use client";

import React from "react";

interface UploadResponse {
  imageUrl: string;
  // 如果有其他欄位，也可以在這裡定義
}

interface ImageUploaderProps {
  onImageUpload: (data: UploadResponse) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
}) => {
  // 當檔案選擇改變時
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

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

      const data: UploadResponse = await res.json();
      onImageUpload(data);
    } catch (error) {
      console.error("上傳錯誤:", error);
    }
  };

  return (
    <div>
      <div className="mt-[64px]">
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
