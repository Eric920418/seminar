import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const logoQuery = {
  logo: async () => await prisma.logo.findMany(),
};

export default logoQuery;
