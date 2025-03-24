"use client";
import { gql } from "graphql-tag";
import { useState, useEffect, useRef } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      setEditorMapImage(data.logo[0].section1?.image);
    };

    fetchData();
  }, []);

  const handleImageUpload3 = (data) => {
    setEditorMapImage(data.fileUrl.fileUrl);
  };

  const handleUpdate = async () => {
    const input = {
      section1: {
        image: editorMapImage,
      },
    };

    try {
      const response = await fetch("http://localhost:3000/api/graphql", {
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
      <div className="text-32M mb-6">ICTE會議資訊</div>
      <div className="flex flex-col gap-[16px]">
        <div className="relative bg-gray-200 w-full p-3">
          <div className="  overflow-hidden transition-all duration-500 ease-in-out">
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
