import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 最大失敗嘗試次數
const MAX_ATTEMPTS = 5;
// 封鎖時間（分鐘）
const BLOCK_DURATION_MINUTES = 30;

/**
 * 獲取客戶端真實 IP 地址
 */
function getClientIP(request: NextRequest): string {
  // 按優先順序檢查各種可能的 header
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }
  
  const clientIP = request.headers.get('x-client-ip');
  if (clientIP) {
    return clientIP.trim();
  }
  
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }
  
  // 在開發環境中返回本地IP
  return process.env.NODE_ENV === 'development' ? '127.0.0.1' : 'unknown';
}

/**
 * 檢查 IP 是否被封鎖
 */
export async function GET(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    
    const ipRecord = await prisma.ipBlocklist.findUnique({
      where: { ipAddress: clientIP }
    });
    
    if (!ipRecord) {
      return NextResponse.json({ blocked: false, attempts: 0 });
    }
    
    // 檢查是否在封鎖期間
    if (ipRecord.blockedAt) {
      const blockEndTime = new Date(ipRecord.blockedAt.getTime() + BLOCK_DURATION_MINUTES * 60 * 1000);
      if (new Date() < blockEndTime) {
        const remainingMinutes = Math.ceil((blockEndTime.getTime() - Date.now()) / (1000 * 60));
        return NextResponse.json({ 
          blocked: true, 
          attempts: ipRecord.attempts,
          remainingMinutes
        });
      } else {
        // 封鎖時間已過，重置記錄
        await prisma.ipBlocklist.update({
          where: { ipAddress: clientIP },
          data: { 
            attempts: 0, 
            blockedAt: null 
          }
        });
        return NextResponse.json({ blocked: false, attempts: 0 });
      }
    }
    
    return NextResponse.json({ blocked: false, attempts: ipRecord.attempts });
  } catch (error) {
    console.error('IP 安全檢查錯誤:', error);
    return NextResponse.json({ error: '系統錯誤' }, { status: 500 });
  }
}

/**
 * 記錄失敗的登入嘗試
 */
export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    
    // 查找或創建 IP 記錄
    const ipRecord = await prisma.ipBlocklist.upsert({
      where: { ipAddress: clientIP },
      update: {
        attempts: { increment: 1 }
      },
      create: {
        ipAddress: clientIP,
        attempts: 1
      }
    });
    
    // 檢查是否達到封鎖條件
    if (ipRecord.attempts >= MAX_ATTEMPTS) {
      await prisma.ipBlocklist.update({
        where: { ipAddress: clientIP },
        data: {
          blockedAt: new Date()
        }
      });
      
      console.log(`🚫 IP ${clientIP} 已被封鎖，失敗嘗試次數: ${ipRecord.attempts}`);
      
      return NextResponse.json({ 
        blocked: true, 
        attempts: ipRecord.attempts,
        message: `您的 IP 已被封鎖 ${BLOCK_DURATION_MINUTES} 分鐘，因為登入失敗次數過多`
      });
    }
    
    const remainingAttempts = MAX_ATTEMPTS - ipRecord.attempts;
    console.log(`⚠️ IP ${clientIP} 登入失敗，剩餘嘗試次數: ${remainingAttempts}`);
    
    return NextResponse.json({ 
      blocked: false, 
      attempts: ipRecord.attempts,
      remainingAttempts
    });
  } catch (error) {
    console.error('記錄登入失敗錯誤:', error);
    return NextResponse.json({ error: '系統錯誤' }, { status: 500 });
  }
}

/**
 * 重置 IP 記錄（成功登入後調用）
 */
export async function DELETE(request: NextRequest) {
  try {
    const clientIP = getClientIP(request);
    
    await prisma.ipBlocklist.deleteMany({
      where: { ipAddress: clientIP }
    });
    
    console.log(`✅ IP ${clientIP} 的失敗記錄已重置`);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('重置 IP 記錄錯誤:', error);
    return NextResponse.json({ error: '系統錯誤' }, { status: 500 });
  }
} 