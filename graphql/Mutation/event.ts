import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const eventMutation = {
  updateEvent: async (_: any, { input }: any) => {
    const { ...updateData } = input;

    try {
      const updated = await prisma.event.update({
        where: { id: 1 },
        data: updateData,
      });
      return updated;
    } catch (error) {
      throw new Error(`更新失敗: ${(error as any).message}`);
    }
  },
};

export default eventMutation;
