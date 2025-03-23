import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const meetingPageQuery = {
  meetingPage: async () => await prisma.meetingPage.findMany(),
};
export default meetingPageQuery;
