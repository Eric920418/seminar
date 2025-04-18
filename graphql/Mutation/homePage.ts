import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const homePageMutation = {
  updateHomePage: async (_: any, { input }: any) => {
    const { ...updateData } = input;

    try {
      const updatedPage = await prisma.homePage.update({
        where: { id: 4 },
        data: updateData,
      });
      return updatedPage;
    } catch (error) {
      throw new Error(`更新失敗: ${(error as any).message}`);
    }
  },
};

export default homePageMutation;
