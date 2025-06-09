import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clearAll() {
  try {
    const result = await prisma.ipBlocklist.deleteMany();
    console.log(`✅ 已清除所有 IP 封鎖記錄 (${result.count} 筆)`);
  } catch (error) {
    console.error("清除失敗:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearAll(); 