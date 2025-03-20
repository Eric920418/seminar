import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const eventQuery = {
  event: async () => await prisma.event.findMany(),
};

export default eventQuery;
