"use client";
import { useState, useEffect } from "react";
import { gql } from "graphql-tag";

const UPDATE_PAGE = gql`
  mutation UpdateColor($input: UpdateColorInput!) {
    updateColor(input: $input) {
      section1
    }
  }
`;

const query = `
  query color {
    color {
      section1
    }
  }
`;

export const Color = () => {
  const [editorColor, setEditorColor] = useState({
    editor1: "",
    editor2: "",
    editor3: "",
    editor4: "",
    editor5: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      setEditorColor({
        editor1: data.color[0].section1.primary,
        editor2: data.color[0].section1.secondary,
        editor3: data.color[0].section1.third,
        editor4: data.color[0].section1?.black,
        editor5: data.color[0].section1?.white,
        editor6: data.color[0].section1?.warning,
      });
    };

    fetchData();
  }, []);
  const handleEditorChange2 = (id: string, content: string) => {
    setEditorColor((prev) => ({
      ...prev,
      [id]: content,
    }));
  };

  const handleUpdate = async () => {
    const input = {
      section1: {
        primary: editorColor.editor1,
        secondary: editorColor.editor2,
        third: editorColor.editor3,
        black: editorColor.editor4,
        white: editorColor.editor5,
        warning: editorColor.editor6,
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
      <div className="text-32M mb-6">顏色</div>
      <div className="flex flex-col gap-[16px]">
        <div className="relative bg-gray-200 w-full p-3">
          <div className="  overflow-hidden transition-all duration-500 ease-in-out">
            <div className="flex flex-col gap-3 mt-5">
              <div className="flex flex-col gap-6">
                <div>
                  <div
                    className={`w-[48px] h-[48px]`}
                    style={{ backgroundColor: editorColor.editor1 }}
                  ></div>
                  <input
                    type="text"
                    value={editorColor.editor1}
                    placeholder="主色 primary"
                    onChange={(e) =>
                      handleEditorChange2("editor1", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
                <div>
                  <div
                    className={`w-[48px] h-[48px]`}
                    style={{ backgroundColor: editorColor.editor2 }}
                  ></div>
                  <input
                    type="text"
                    value={editorColor.editor2}
                    placeholder="次要色 secondary"
                    onChange={(e) =>
                      handleEditorChange2("editor2", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
                <div>
                  <div
                    className={`w-[48px] h-[48px]`}
                    style={{ backgroundColor: editorColor.editor3 }}
                  ></div>
                  <input
                    type="text"
                    value={editorColor.editor3}
                    placeholder="細節色 tertiary"
                    onChange={(e) =>
                      handleEditorChange2("editor3", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
                <div>
                  <div
                    className={`w-[48px] h-[48px]`}
                    style={{ backgroundColor: editorColor.editor4 }}
                  ></div>
                  <input
                    type="text"
                    value={editorColor.editor4}
                    placeholder="黑色"
                    onChange={(e) =>
                      handleEditorChange2("editor4", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
                <div>
                  <div
                    className={`w-[48px] h-[48px]`}
                    style={{ backgroundColor: editorColor.editor5 }}
                  ></div>
                  <input
                    type="text"
                    value={editorColor.editor5}
                    placeholder="白色"
                    onChange={(e) =>
                      handleEditorChange2("editor5", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div>
                {/* <div>
                  <div
                    className={`w-[48px] h-[48px]`}
                    style={{ backgroundColor: editorColor.editor6 }}
                  ></div>
                  <input
                    type="text"
                    placeholder="警告"
                    onChange={(e) =>
                      handleEditorChange2("editor6", e.target.value)
                    }
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2"
                  />
                </div> */}
              </div>
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
