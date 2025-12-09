import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Next.js App Router 設定
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// 從環境變數取得上傳目錄
const UPLOAD_DIR =
  process.env.UPLOAD_DIR || path.join(process.cwd(), "..", "uploads");

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    console.log("請求的檔案名稱：", filename);

    // 檢查檔名是否合法（安全性檢查）
    if (!filename || filename.includes("..")) {
      console.error("無效的檔名：", filename);
      return NextResponse.json({ error: "無效的檔名" }, { status: 400 });
    }

    const filePath = path.join(UPLOAD_DIR, "pdfs", filename);
    console.log("完整檔案路徑：", filePath);

    // 檢查檔案是否存在
    try {
      await fs.access(filePath);
      console.log("檔案存在且可訪問");
    } catch (error) {
      console.error("檔案存取錯誤：", error);
      return NextResponse.json({ error: "找不到 PDF 檔案" }, { status: 404 });
    }

    // 讀取檔案
    let file;
    try {
      file = await fs.readFile(filePath);
      console.log("檔案讀取成功，大小：", file.length, "bytes");
    } catch (error) {
      console.error("檔案讀取錯誤：", error);
      return NextResponse.json({ error: "讀取 PDF 失敗" }, { status: 500 });
    }

    // 建立回應
    try {
      const response = new NextResponse(file, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `inline; filename="${encodeURIComponent(
            filename
          )}"`,
          "Content-Length": file.length.toString(),
          "Cache-Control": "public, max-age=31536000",
        },
      });
      console.log("回應建立成功");
      return response;
    } catch (error) {
      console.error("回應建立錯誤：", error);
      return NextResponse.json({ error: "建立回應失敗" }, { status: 500 });
    }
  } catch (error) {
    console.error("處理請求時發生錯誤：", error);
    return NextResponse.json({ error: "處理請求失敗" }, { status: 500 });
  }
}
