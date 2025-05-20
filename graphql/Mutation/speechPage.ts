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
const speechPageUpdateSchema = z
  .object({
    // 演講頁面各區塊資料
    section1: jsonValue.optional(),
    section2: jsonValue.optional(),

    // 明確禁止更新的欄位
    id: z.undefined(),
    createdAt: z.undefined(),
    updatedAt: z.undefined(),
  })
  .strict(); // 嚴格模式：禁止傳入未定義的欄位

const speechPageMutation = {
  updateSpeechPage: async (_: any, { input }: { input: unknown }) => {
    // 驗證輸入資料
    const parsed = speechPageUpdateSchema.safeParse(input);
    if (!parsed.success) {
      throw new Error(`欄位驗證失敗：${JSON.stringify(parsed.error.errors)}`);
    }

    try {
      // 只更新通過驗證的欄位
      const updatedPage = await prisma.speechPage.update({
        where: { id: 1 }, // 固定 ID
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

export default speechPageMutation;
