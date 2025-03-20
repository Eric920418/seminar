import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const paperQuery = {
  paperPage: async () => await prisma.paperPage.findMany(),
};

export default paperQuery;
