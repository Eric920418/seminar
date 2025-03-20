import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const paperPageMutation = {
  updatePaperPage: async (_: any, { input }: any) => {
    const { ...updateData } = input;

    try {
      const updatedPage = await prisma.paperPage.update({
        where: { id: 1 },
        data: updateData,
      });
      return updatedPage;
    } catch (error) {
      throw new Error(`更新失敗: ${error.message}`);
    }
  },
};

export default paperPageMutation;
