import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const hostQuery = {
  host: async () => await prisma.host.findMany(),
};

export default hostQuery;
