import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// 從環境變數取得上傳目錄
const UPLOAD_DIR =
  process.env.UPLOAD_DIR || path.join(process.cwd(), "..", "uploads");

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const { filename } = params;

    // 檢查檔名是否合法（安全性檢查）
    if (!filename || filename.includes("..")) {
      return NextResponse.json({ error: "無效的檔名" }, { status: 400 });
    }

    const filePath = path.join(UPLOAD_DIR, "pdfs", filename);

    // 檢查檔案是否存在
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: "找不到 PDF 檔案" }, { status: 404 });
    }

    // 讀取檔案
    const file = await fs.readFile(filePath);

    // 回傳 PDF 檔案
    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("讀取 PDF 錯誤：", error);
    return NextResponse.json({ error: "讀取 PDF 失敗" }, { status: 500 });
  }
}
