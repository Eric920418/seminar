"use client";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
const query = `
  query paperPage {
    paperPage {
      section2
    }
  }
`;

export const Topics = () => {
  const [editorContents, setEditorContents] = useState({
    editor1: "",
    editor2: "",
    editor3: "",
    editor4: "",

    editor7: "",
    editor8: "",

    editor10: "",
    editor11: "",

    editor19: "",
    editor20: "",
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      setEditorContents({
        editor1: data.paperPage[0].section2.dataContent1,
        editor2: data.paperPage[0].section2.dataText2,
        editor3: data.paperPage[0].section2.dataText3,
        editor4: data.paperPage[0].section2.dataLink1,

        editor7: data.paperPage[0].section2.dataQrCode,
        editor8: data.paperPage[0].section2.dataCKEdit,

        editor10: data.paperPage[0].section2.dataA,
        editor11: data.paperPage[0].section2.dataArea,

        editor19: data.paperPage[0].section2.content8,
        editor20: data.paperPage[0].section2.text1,
      });
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-[976px]  ">
      <div className="px-3 desktop:px-0">
        <div className="text-16M text-primary">Topics & Paper Format</div>
        <div className="relative w-fit ">
          <div className="text-black text-36M desktop:text-48M  relative z-10 ">
            徵文主題與論文格式
          </div>
          <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
        </div>
      </div>

      <div className="px-3 desktop:px-0">
        <div className="mt-[16px]">
          <div className="text-secondary text-20M px-3 desktop:px-0">
            學術論文發表
          </div>
          <div className="mt-[24px] text-[#252F38B2] text-16R px-3 desktop:px-0">
            {editorContents.editor1}
          </div>
        </div>
        <div className="mt-[32px] grid desktop:grid-cols-2 gap-[16px] desktop:gap-[32px]">
          <div className="flex flex-col gap-[16px] desktop:gap-[32px]">
            <div className="bg-white p-[16px] desktop:p-[32px] rounded-[24px]">
              <div className="text-secondary text-20M">徵稿主題</div>
              <div className="mt-[24px] text-black text-15R break-words">
                {editorContents.editor2}
              </div>
              <div
                className="mt-[16px] text-black text-[12px] desktop:text-15R break-words"
                dangerouslySetInnerHTML={{
                  __html: editorContents.editor3.replace(/\n/g, "<br>"),
                }}
              ></div>
            </div>
            <div className="bg-white p-[16px] desktop:p-[32px] rounded-[24px] flex-1">
              <div className="text-secondary text-20M">投稿方式</div>
              <div className="mt-[24px] flex flex-col desktop:flex-row justify-between desktop:space-x-[16px] space-y-[16px] desktop:space-y-0">
                <div
                  className="text-black text-15R break-words"
                  dangerouslySetInnerHTML={{
                    __html: editorContents.editor4,
                  }}
                ></div>
                <div className="flex justify-center">
                  <QRCodeCanvas
                    value={editorContents.editor7}
                    size={90}
                    className="desktop:w-[110px] desktop:h-[110px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[16px] desktop:gap-[32px]">
            <div className="bg-white p-[16px] desktop:p-[32px] rounded-[24px]">
              <div className="text-secondary text-20M">徵稿對象</div>
              <div
                className="mt-[24px] text-black text-15R break-words"
                dangerouslySetInnerHTML={{
                  __html: editorContents.editor19.replace(/\n/g, "<br>"),
                }}
              ></div>
            </div>
            <div className="bg-white p-[16px] desktop:p-[32px] rounded-[24px]">
              <div className="text-secondary text-20M">審查結果通知日期</div>
              <div
                className="mt-[24px] text-black text-15R break-words"
                dangerouslySetInnerHTML={{
                  __html: editorContents.editor8,
                }}
              ></div>
            </div>
            <div className="bg-white p-[16px] desktop:p-[32px] rounded-[24px] flex-1">
              <div className="text-secondary text-20M">投稿形式：論文摘要</div>
              <div
                className="mt-[24px] text-black text-15R break-words"
                dangerouslySetInnerHTML={{
                  __html: editorContents.editor10.replace(/\n/g, "<br>"),
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="mt-[16px]">
          <div className="bg-white p-[16px] desktop:p-[32px] rounded-[24px]">
            <div className="text-secondary text-20M">入選稿件之注意事項</div>
            <div className="mt-[24px] text-black text-[12px] desktop:text-15R break-words">
              <span
                dangerouslySetInnerHTML={{
                  __html: editorContents.editor11,
                }}
              />
            </div>
          </div>
        </div>
        <div className="mt-[16px]">
          <div className="bg-white p-[16px] desktop:p-[32px] rounded-[24px]">
            <div className="text-secondary text-20M">聯絡窗口</div>
            <div
              className="mt-[24px] text-black text-15R break-words"
              dangerouslySetInnerHTML={{
                __html: editorContents.editor20.replace(/\n/g, "<br>"),
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
