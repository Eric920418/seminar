import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const colorQuery = {
  color: async () => await prisma.color.findMany(),
};

export default colorQuery;
