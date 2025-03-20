import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    // 設定上傳目錄：專案根目錄下的 /public/image
    const uploadDir = path.join(process.cwd(), "public", "image");
    await fs.mkdir(uploadDir, { recursive: true });

    // 使用內建的 formData() 方法取得表單資料
    const formData = await request.formData();
    const fileField = formData.get("image");

    // 檢查是否有上傳檔案，且是否為 File 物件
    if (!fileField || !(fileField instanceof File)) {
      return NextResponse.json({ error: "找不到圖片檔案" }, { status: 400 });
    }

    // 將上傳的檔案轉成 Buffer
    const fileBuffer = Buffer.from(await fileField.arrayBuffer());

    // 自訂檔名：在原始檔名前加上 timestamp，並將空白轉換成 -
    const timestamp = Date.now();
    const originalName = fileField.name;
    const safeName = originalName.replace(/\s+/g, "-");
    const fileName = `${timestamp}-${safeName}`;
    const filePath = path.join(uploadDir, fileName);

    // 寫入檔案到指定目錄
    await fs.writeFile(filePath, fileBuffer);

    // 回傳成功訊息以及檔案可存取的 URL（public 資料夾下的檔案可直接透過 /image/ 來存取）
    return NextResponse.json({
      message: "上傳成功",
      fileUrl: `/image/${fileName}`,
    });
  } catch (error) {
    console.error("上傳錯誤：", error);
    return NextResponse.json({ error: "檔案上傳失敗" }, { status: 500 });
  }
}
