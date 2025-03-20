import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    // 設定上傳目錄（請確保 public/uploads 資料夾存在，或讓程式自動建立）
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // 使用內建的 formData() 方法取得表單資料
    const formData = await request.formData();
    const fileField = formData.get("pdf");

    // 檢查是否有上傳檔案，且是否為 File 物件
    if (!fileField || !(fileField instanceof File)) {
      return NextResponse.json({ error: "找不到 PDF 檔案" }, { status: 400 });
    }

    // 將上傳的檔案轉成 Buffer
    const fileBuffer = Buffer.from(await fileField.arrayBuffer());
    const fileName = fileField.name; // 這裡可以依需求改成自定義檔名
    const filePath = path.join(uploadDir, fileName);

    // 寫入檔案到指定目錄
    await fs.writeFile(filePath, fileBuffer);

    // 回傳成功訊息以及檔案可存取的 URL（public 資料夾下的檔案可直接透過 /uploads/ 來存取）
    return NextResponse.json({
      message: "上傳成功",
      fileUrl: `/uploads/${fileName}`,
    });
  } catch (error) {
    console.error("上傳錯誤：", error);
    return NextResponse.json({ error: "檔案上傳失敗" }, { status: 500 });
  }
}
