"use client";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Link from "next/link";
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
    editor5: "",
    editor6: "",
    editor7: "",
    editor8: "",
    editor9: "",
    editor10: "",
    editor11: "",
    editor12: "",
    editor13: "",
    editor14: "",
    editor15: "",
    editor16: "",
    editor17: "",
    editor18: "",
    editor19: "",
    editor20: "",
  });

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/graphql", {
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
        editor5: data.paperPage[0].section2.dataLink2,
        editor6: data.paperPage[0].section2.dataLink3,
        editor7: data.paperPage[0].section2.dataQrCode,
        editor8: data.paperPage[0].section2.dataCKEdit,
        editor9: data.paperPage[0].section2.dataDate,
        editor10: data.paperPage[0].section2.dataA,
        editor11: data.paperPage[0].section2.dataArea,
        editor12: data.paperPage[0].section2.content1,
        editor13: data.paperPage[0].section2.content2,
        editor14: data.paperPage[0].section2.content3,
        editor15: data.paperPage[0].section2.content4,
        editor16: data.paperPage[0].section2.content5,
        editor17: data.paperPage[0].section2.content6,
        editor18: data.paperPage[0].section2.content7,
        editor19: data.paperPage[0].section2.content8,
        editor20: data.paperPage[0].section2.text1,
      });
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-[976px]">
      <div className="text-16M text-primary">Topics & Paper Format</div>
      <div className="relative w-fit">
        <div className="text-black text-36M desktop:text-48M  relative z-10">
          徵文主題與論文格式
        </div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>

      <div className="mt-[16px]">
        <div className="text-secondary text-20M px-3 desktop:px-0">
          學術論文發表
        </div>
        <div className="mt-[24px] text-[#252F38B2] text-16R px-3 desktop:px-0">
          {editorContents.editor1}
        </div>
      </div>
      <div className="mt-[32px] grid desktop:grid-cols-2 gap-[32px] ">
        <div className="flex flex-col gap-[32px] ">
          <div className="bg-white p-[32px] rounded-[24px]">
            <div className="text-secondary text-20M ">徵稿主題</div>
            <div className="mt-[24px] text-black text-15R  ">
              {editorContents.editor2}
            </div>
            <div
              className="mt-[16px] text-black text-[12px] desktop:text-15R  "
              dangerouslySetInnerHTML={{
                __html: editorContents.editor3.replace(/\n/g, "<br>"),
              }}
            ></div>
          </div>
          <div className="bg-white p-[32px] rounded-[24px] flex-1">
            <div className="text-secondary text-20M ">投稿方式</div>
            <div className="mt-[24px] flex space-x-[16px]">
              <div className="text-black text-15R ">
                填妥
                <span>
                  <Link
                    href={editorContents.editor4}
                    className="text-blue-500 underline text-16R  break-all mt-[4px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    投稿者基本資料表（點此下載附件1）
                  </Link>
                </span>
                及
                <span>
                  <Link
                    href={editorContents.editor5}
                    className="text-blue-500 underline text-16R  break-all mt-[4px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    論文摘要格式（點此下載附件2）
                  </Link>
                </span>
                後，上傳至
                <span>
                  <Link
                    href={editorContents.editor6}
                    className="text-blue-500 underline text-16R  break-all mt-[4px]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://reurl.cc/lgmjKQ
                  </Link>
                </span>
                ，亦可掃描投稿QRcode上傳。
              </div>
              <div>
                <QRCodeCanvas value={editorContents.editor7} size={110} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[32px] ">
          <div className="bg-white p-[32px] rounded-[24px]">
            <div className="text-secondary text-20M ">徵稿對象</div>
            <div
              className="mt-[24px] text-black text-15R"
              dangerouslySetInnerHTML={{
                __html: editorContents.editor19.replace(/\n/g, "<br>"),
              }}
            ></div>
          </div>
          <div className="bg-white p-[32px] rounded-[24px]">
            <div className="text-secondary text-20M ">審查結果通知日期</div>
            <div className="mt-[24px] text-black text-15R  ">
              {editorContents.editor8}
              <span>
                <Link
                  href={editorContents.editor9}
                  className="text-blue-500 underline text-16R  break-all mt-[4px]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {editorContents.editor9}
                </Link>
              </span>
              ）
            </div>
          </div>
          <div className="bg-white p-[32px] rounded-[24px] flex-1">
            <div className="text-secondary text-20M ">投稿形式：論文摘要</div>
            <div
              className="mt-[24px] text-black text-15R  "
              dangerouslySetInnerHTML={{
                __html: editorContents.editor10.replace(/\n/g, "<br>"),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="mt-[16px]">
        <div className="bg-white p-[32px] rounded-[24px]">
          <div className="text-secondary text-20M ">入選稿件之注意事項</div>
          <div className="mt-[24px] text-black text-[12px] desktop:text-15R  ">
            <span>{editorContents.editor11}</span>
            <br />
            <span>{editorContents.editor12}</span>
            <span>
              <Link
                href={editorContents.editor13}
                className="text-blue-500 underline text-16R  break-all mt-[4px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                附件3。
              </Link>
            </span>
            <br />
            <span>{editorContents.editor14}</span>
            <span>
              <Link
                href={editorContents.editor15}
                className="text-blue-500 underline text-16R  break-all mt-[4px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                附件4。
              </Link>
            </span>
            <br />
            <span>{editorContents.editor16}</span>
            <span>
              <Link
                href={editorContents.editor17}
                className="text-blue-500 underline text-16R  break-all mt-[4px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                附件5。
              </Link>
            </span>
            <br />
            <span>{editorContents.editor18}</span>
          </div>
        </div>
      </div>
      <div className="mt-[16px]">
        <div className="bg-white p-[32px] rounded-[24px]">
          <div className="text-secondary text-20M ">聯絡窗口</div>
          <div
            className="mt-[24px] text-black text-15R "
            dangerouslySetInnerHTML={{
              __html: editorContents.editor20.replace(/\n/g, "<br>"),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};
