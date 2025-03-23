import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const forumPageQuery = {
  forumPage: async () => await prisma.forumPage.findMany(),
};
export default forumPageQuery;
