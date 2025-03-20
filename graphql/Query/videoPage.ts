import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const videoPageQuery = {
  videoPage: async () => await prisma.videoPage.findMany(),
};
export default videoPageQuery;
