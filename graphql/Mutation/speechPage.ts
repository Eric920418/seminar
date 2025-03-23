import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const speechPageMutation = {
  updateSpeechPage: async (_: any, { input }: any) => {
    const { ...updateData } = input;

    try {
      const updatedPage = await prisma.speechPage.update({
        where: { id: 1 },
        data: updateData,
      });
      return updatedPage;
    } catch (error) {
      throw new Error(`更新失敗: ${(error as any).message}`);
    }
  },
};

export default speechPageMutation;
