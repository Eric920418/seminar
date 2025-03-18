import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const homePageQuery = {
  homePage: async () => await prisma.homePage.findMany(),
};
export default homePageQuery;
