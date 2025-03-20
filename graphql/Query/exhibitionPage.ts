import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const exhibitionPageQuery = {
  exhibitionPage: async () => await prisma.exhibitionPage.findMany(),
};
export default exhibitionPageQuery;
