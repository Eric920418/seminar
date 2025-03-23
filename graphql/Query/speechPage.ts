import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const speechPageQuery = {
  speechPage: async () => await prisma.speechPage.findMany(),
};
export default speechPageQuery;
