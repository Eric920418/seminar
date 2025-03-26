"use client";
import { gql } from "graphql-tag";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ImageUploader } from "@/components/Admin/ImageUploader";
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
  const [editorFooter, setEditorFooter] = useState({
    editor1: "",
    editor2: "",
    editor3: "",
    editor4: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      setEditorMapImage(data.logo[0].section1?.image);
      setEditorFooter({
        editor1: data.logo[0].section1?.footer.editor1,
        editor2: data.logo[0].section1?.footer.editor2,
        editor3: data.logo[0].section1?.footer.editor3,
        editor4: data.logo[0].section1?.footer.editor4,
      });
    };

    fetchData();
  }, []);

  const handleEditorChange2 = (id: string, content: string) => {
    setEditorFooter((prev) => ({
      ...prev,
      [id]: content,
    }));
  };
  const handleImageUpload3 = (data) => {
    setEditorMapImage(data.fileUrl.fileUrl);
  };

  const handleUpdate = async () => {
    const input = {
      section1: {
        image: editorMapImage,
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
        alert("更新成功");
      }
    } catch (err) {
      console.error("更新失敗:", err);
    }
  };

  return (
    <div>
      <div className="text-32M mb-6">Logo/Footer</div>
      <div className="flex flex-col gap-[16px]">
        <div className="relative bg-gray-200 w-full p-3">
          <div className=" overflow-hidden transition-all duration-500 ease-in-out">
            <div className="flex flex-col gap-3 mt-5">
              {editorMapImage && (
                <Image
                  src={editorMapImage}
                  width={200}
                  height={100}
                  alt="Example"
                />
              )}
              <ImageUploader
                onImageUpload={(filename) =>
                  handleImageUpload3({ fileUrl: filename })
                }
              />
            </div>
          </div>
        </div>
        <div className="relative bg-gray-200 w-full p-3">
          <div className=" overflow-hidden transition-all duration-500 ease-in-out">
            <div className="flex flex-col gap-3 ">
              <div className="text-16M">{editorFooter.editor1}</div>
              <input
                type="text"
                value={editorFooter.editor1}
                placeholder="Footer"
                onChange={(e) => handleEditorChange2("editor1", e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
              />
              <div className="text-16M">{editorFooter.editor2}</div>
              <input
                type="text"
                value={editorFooter.editor2}
                placeholder="FB"
                onChange={(e) => handleEditorChange2("editor2", e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
              />
              <div className="text-16M">{editorFooter.editor3}</div>
              <input
                type="text"
                value={editorFooter.editor3}
                placeholder="IG"
                onChange={(e) => handleEditorChange2("editor3", e.target.value)}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
              />
              <div className="text-16M">{editorFooter.editor4}</div>
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
