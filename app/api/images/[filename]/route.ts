import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// 使用相同的 UPLOAD_DIR 設定
const UPLOAD_DIR =
  process.env.UPLOAD_DIR || path.join(process.cwd(), "..", "uploads");

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    // 等待 params
    const { filename } = params;

    // 檢查檔名是否合法（安全性檢查）
    if (!filename || filename.includes("..")) {
      return NextResponse.json({ error: "無效的檔名" }, { status: 400 });
    }

    const imagePath = path.join(UPLOAD_DIR, "images", filename);

    // 檢查檔案是否存在
    try {
      await fs.access(imagePath);
    } catch {
      return NextResponse.json({ error: "找不到圖片" }, { status: 404 });
    }

    // 讀取檔案
    const file = await fs.readFile(imagePath);

    // 根據副檔名決定 Content-Type
    const ext = path.extname(filename).toLowerCase();
    const contentType =
      {
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".webp": "image/webp",
      }[ext] || "application/octet-stream";

    // 回傳檔案
    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000",
      },
    });
  } catch (error) {
    console.error("讀取圖片錯誤：", error);
    return NextResponse.json({ error: "讀取圖片失敗" }, { status: 500 });
  }
}
