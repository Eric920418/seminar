import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// 定義符合 Prisma JSON 型別的 schema
const jsonValue: z.ZodType<any> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(jsonValue),
    z.record(jsonValue),
  ])
);

// 定義可更新欄位的 schema
const homePageUpdateSchema = z
  .object({
    // 區塊一：包含標題、內文、日期標籤、地點等資料
    section1: jsonValue.optional(),

    // 區塊二：卡片列表，建議以陣列形式儲存每個卡片的資料（年份、日期、內容等）
    section2: jsonValue.optional(),

    // 區塊三：時間相關資訊，包含各種時間、延長時間、會議與晚宴等
    section3: jsonValue.optional(),

    // 區塊四：手冊下載網址與圖片資料，圖片可另存 URL 與其他 metadata
    section4: jsonValue.optional(),

    // 區塊五：影片連結資料
    section5: jsonValue.optional(),

    // 區塊六：主辦單位、承辦單位與協辦單位等資料
    section6: jsonValue.optional(),

    // 明確禁止更新的欄位
    id: z.undefined(),
    createdAt: z.undefined(),
    updatedAt: z.undefined(),
  })
  .strict(); // 嚴格模式：禁止傳入未定義的欄位

const homePageMutation = {
  updateHomePage: async (_: any, { input }: { input: unknown }) => {
    // 驗證輸入資料
    const parsed = homePageUpdateSchema.safeParse(input);
    if (!parsed.success) {
      throw new Error(`欄位驗證失敗：${JSON.stringify(parsed.error.errors)}`);
    }

    try {
      // 只更新通過驗證的欄位
      const updatedPage = await prisma.homePage.update({
        where: { id: 4 }, // 固定 ID
        data: parsed.data,
      });
      return updatedPage;
    } catch (error) {
      // 更詳細的錯誤處理
      if (error instanceof Error) {
        throw new Error(`更新失敗: ${error.message}`);
      }
      throw new Error("更新過程發生未知錯誤");
    }
  },
};

export default homePageMutation;
