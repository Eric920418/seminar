import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const workShopPageQuery = {
  workShopPage: async () => await prisma.workshopPage.findMany(),
};
export default workShopPageQuery;
