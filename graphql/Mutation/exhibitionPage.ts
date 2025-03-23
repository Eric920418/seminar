import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const exhibitionPageMutation = {
  updateExhibitionPage: async (_: any, { input }: any) => {
    const { ...updateData } = input;

    try {
      const updatedPage = await prisma.exhibitionPage.update({
        where: { id: 2 },
        data: updateData,
      });
      return updatedPage;
    } catch (error) {
      throw new Error(`更新失敗: ${(error as any).message}`);
    }
  },
};

export default exhibitionPageMutation;
