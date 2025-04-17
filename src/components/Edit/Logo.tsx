"use client";
import { gql } from "graphql-tag";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageUploader } from "@/components/Admin/ImageUploader";

// 匯入或定義 UploadResponse 介面
interface UploadResponse {
  fileUrl: string;
}

const UPDATE_PAGE = gql`
  mutation UpdateLogo($input: UpdateLogoInput!) {
    updateLogo(input: $input) {
      section1
    }
  }
`;

const query = `
  query logo {
    logo {
      section1
    }
  }
`;

export const Logo = () => {
  const [editorMapImage, setEditorMapImage] = useState("");
  const [editorFavicon, setEditorFavicon] = useState("");
  const [editorFooter, setEditorFooter] = useState({
    editor1: "",
    editor2: "",
    editor3: "",
    editor4: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      setEditorFooter({
        editor1: data.logo[0].section1.footer.editor1,
        editor2: data.logo[0].section1.footer.editor2,
        editor3: data.logo[0].section1.footer.editor3,
        editor4: data.logo[0].section1.footer?.editor4,
      });
      setEditorMapImage(data.logo[0].section1.image);
      setEditorFavicon(data.logo[0].section1.favicon);
    };

    fetchData();
  }, []);

  const handleEditorChange2 = (id: string, content: string) => {
    setEditorFooter((prev) => ({ ...prev, [id]: content }));
  };

  const handleImageUpload3 = (data: UploadResponse) => {
    setEditorMapImage(data.fileUrl);
  };

  const handleFaviconUpload = (data: UploadResponse) => {
    setEditorFavicon(data.fileUrl);
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const input = {
      section1: {
        image: editorMapImage,
        favicon: editorFavicon,
        footer: editorFooter,
      },
    };

    try {
      const response = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: UPDATE_PAGE.loc?.source.body,
          variables: { input },
        }),
      });
      const result = await response.json();
      if (result.errors) {
        console.error("更新失敗:", JSON.stringify(result.errors, null, 2));
      } else {
        // 替換或新增 favicon
        if (editorFavicon) {
          const existing = document.querySelector(
            'link[rel="icon"]'
          ) as HTMLLinkElement;
          if (existing) {
            existing.href = editorFavicon;
          } else {
            const link = document.createElement("link");
            link.rel = "icon";
            link.href = editorFavicon;
            document.head.appendChild(link);
          }
        }
      }
    } catch (err) {
      console.error("更新失敗:", err);
    } finally {
      alert("更新成功");
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mb-3"></div>
            <p className="text-gray-700">資料處理中，請稍候...</p>
          </div>
        </div>
      )}

      <div className="text-32M mb-6">Logo/Footer</div>
      <div className="flex flex-col gap-[16px]">
        <div className="relative bg-gray-200 w-full p-3">
          <div className="text-16M font-bold mb-2">網站Logo</div>
          <div className="overflow-hidden transition-all duration-500 ease-in-out">
            <div className="flex flex-col gap-3 mt-5">
              {editorMapImage && (
                <Image
                  src={editorMapImage}
                  width={200}
                  height={100}
                  alt="現有Logo"
                />
              )}
              <ImageUploader onImageUpload={handleImageUpload3} />
            </div>
          </div>
        </div>

        <div className="relative bg-gray-200 w-full p-3">
          <div className="text-16M font-bold mb-2">
            網站Favicon (建議使用正方形圖片，尺寸32x32或64x64像素)
          </div>
          <div className="overflow-hidden transition-all duration-500 ease-in-out">
            <div className="flex flex-col gap-3 mt-5">
              {editorFavicon && (
                <div className="flex items-center gap-4">
                  <Image
                    src={editorFavicon}
                    width={32}
                    height={32}
                    alt="現有Favicon"
                  />
                  <span className="text-14R">目前Favicon預覽</span>
                </div>
              )}
              <ImageUploader onImageUpload={handleFaviconUpload} />
            </div>
          </div>
        </div>

        <div className="relative bg-gray-200 w-full p-3">
          <div className="text-16M font-bold mb-2">頁尾設定</div>
          <div className="overflow-hidden transition-all duration-500 ease-in-out">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={editorFooter.editor1}
                placeholder="Footer"
                onChange={(e) => handleEditorChange2("editor1", e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
              />
              <input
                type="text"
                value={editorFooter.editor2}
                placeholder="FB"
                onChange={(e) => handleEditorChange2("editor2", e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
              />
              <input
                type="text"
                value={editorFooter.editor3}
                placeholder="IG"
                onChange={(e) => handleEditorChange2("editor3", e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
              />
              <input
                type="text"
                value={editorFooter.editor4}
                placeholder="YT"
                onChange={(e) => handleEditorChange2("editor4", e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          更新資料
        </button>
      </div>
    </div>
  );
};
