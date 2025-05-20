import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// 定義基本的 JSON 物件驗證 schema
const baseJsonSchema = z.object({}).passthrough();

// 定義可更新欄位的 schema
const forumPageUpdateSchema = z
  .object({
    // 論壇頁面區塊
    section1: baseJsonSchema.optional(),
    section2: baseJsonSchema.optional(),

    // 明確禁止更新的欄位
    id: z.undefined(),
    createdAt: z.undefined(),
    updatedAt: z.undefined(),
  })
  .strict(); // 嚴格模式：禁止傳入未定義的欄位

const forumPageMutation = {
  updateForumPage: async (_: any, { input }: { input: unknown }) => {
    // 驗證輸入資料
    const parsed = forumPageUpdateSchema.safeParse(input);
    if (!parsed.success) {
      throw new Error(`欄位驗證失敗：${JSON.stringify(parsed.error.errors)}`);
    }

    try {
      // 只更新通過驗證的欄位
      const updatedPage = await prisma.forumPage.update({
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

export default forumPageMutation;
