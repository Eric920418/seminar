import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("=== IP 封鎖記錄檢查 ===\n");

  try {
    // 獲取所有 IP 記錄
    const records = await prisma.ipBlocklist.findMany({
      orderBy: { updatedAt: 'desc' }
    });

    if (records.length === 0) {
      console.log("✅ 目前沒有任何 IP 封鎖記錄");
      return;
    }

    console.log(`找到 ${records.length} 筆記錄:\n`);

    records.forEach(record => {
      console.log(`IP/ID: ${record.ipAddress}`);
      console.log(`  - 失敗次數: ${record.attempts}`);
      console.log(`  - 是否被封鎖: ${record.blockedAt ? '是' : '否'}`);
      
      if (record.blockedAt) {
        const blockEndTime = new Date(record.blockedAt.getTime() + 30 * 60 * 1000);
        const remainingMinutes = Math.max(0, Math.ceil((blockEndTime.getTime() - Date.now()) / (1000 * 60)));
        console.log(`  - 封鎖時間: ${record.blockedAt.toLocaleString()}`);
        console.log(`  - 剩餘封鎖時間: ${remainingMinutes} 分鐘`);
      }
      
      console.log(`  - 首次記錄: ${record.createdAt.toLocaleString()}`);
      console.log(`  - 最後更新: ${record.updatedAt.toLocaleString()}`);
      console.log('---');
    });

    // 檢查是否有相同 IP 的問題
    const ipCount = new Map<string, number>();
    records.forEach(record => {
      if (record.ipAddress === '127.0.0.1' || 
          record.ipAddress === 'unknown' || 
          record.ipAddress.startsWith('unknown-')) {
        console.log(`⚠️ 警告：發現使用預設/臨時 IP 的記錄: ${record.ipAddress}`);
      }
    });

  } catch (error) {
    console.error("錯誤:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// 清理特定 IP 的函數
async function clearIP(ip: string) {
  try {
    const result = await prisma.ipBlocklist.deleteMany({
      where: { ipAddress: ip }
    });
    console.log(`✅ 已清除 IP ${ip} 的記錄 (${result.count} 筆)`);
  } catch (error) {
    console.error("清除失敗:", error);
  }
}

// 清理所有記錄的函數
async function clearAll() {
  try {
    const result = await prisma.ipBlocklist.deleteMany();
    console.log(`✅ 已清除所有 IP 封鎖記錄 (${result.count} 筆)`);
  } catch (error) {
    console.error("清除失敗:", error);
  }
}

// 執行主程式
main();

// 如果需要清理記錄，可以取消註解以下程式碼：
// clearIP('127.0.0.1');
// clearAll(); 