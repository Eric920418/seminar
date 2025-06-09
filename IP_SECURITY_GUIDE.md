# IP 安全封鎖功能說明

## 功能概述

為了保護管理員登入頁面免受暴力攻擊，系統現在具備了 IP 封鎖機制：

### 安全機制
- **失敗次數限制**：同一 IP 地址連續 5 次登入失敗將被封鎖
- **封鎖時間**：被封鎖的 IP 將暫時無法登入 30 分鐘
- **自動解封**：封鎖時間過後，IP 會自動解除封鎖
- **成功重置**：成功登入後，該 IP 的失敗記錄會被清空

## 實現細節

### 數據庫模型
```sql
CREATE TABLE "ip_blocklist" (
    "id" SERIAL NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "blockedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ip_blocklist_pkey" PRIMARY KEY ("id")
);
```

### API 端點
- `GET /api/auth/ip-security` - 檢查 IP 封鎖狀態
- `POST /api/auth/ip-security` - 記錄登入失敗
- `DELETE /api/auth/ip-security` - 重置 IP 記錄

### 前端功能
- 即時顯示失敗嘗試次數和剩餘次數
- 被封鎖時禁用登入表單
- 顯示封鎖剩餘時間
- 提供安全提示說明

## 安全配置

### 可調整參數
在 `app/api/auth/ip-security/route.ts` 中：
```typescript
const MAX_ATTEMPTS = 5;                    // 最大失敗嘗試次數
const BLOCK_DURATION_MINUTES = 30;        // 封鎖時間（分鐘）
```

### IP 獲取機制
系統會按以下優先順序獲取真實 IP：
1. `x-forwarded-for` header
2. `x-real-ip` header  
3. `x-client-ip` header
4. `cf-connecting-ip` header (Cloudflare)
5. 開發環境預設為 `127.0.0.1`

## 使用者體驗

### 正常狀態
- 使用者可以正常登入
- 錯誤密碼會顯示標準錯誤訊息

### 警告狀態 (1-4 次失敗)
- 顯示黃色警告框
- 提示已有失敗記錄和剩餘嘗試次數

### 封鎖狀態 (5 次失敗)
- 顯示紅色錯誤訊息
- 登入表單被禁用
- 顯示剩餘封鎖時間
- 提供安全說明

## 管理員功能

### 手動解除封鎖
如需手動解除特定 IP 的封鎖，可以直接操作資料庫：
```sql
DELETE FROM ip_blocklist WHERE "ipAddress" = '目標IP地址';
```

### 查看封鎖記錄
```sql
SELECT * FROM ip_blocklist ORDER BY "updatedAt" DESC;
```

### 清空所有記錄
```sql
TRUNCATE TABLE ip_blocklist RESTART IDENTITY;
```

## 注意事項

1. **代理服務器環境**：確保正確配置反向代理以傳遞真實 IP
2. **共用 IP 問題**：注意公司或學校等共用 IP 環境可能影響多個使用者
3. **監控日誌**：定期檢查伺服器日誌中的封鎖記錄
4. **備用管理**：確保有其他方式可以管理系統，以防意外封鎖

## 測試方法

1. 連續輸入錯誤密碼 5 次
2. 確認 IP 被封鎖且無法繼續嘗試
3. 等待 30 分鐘或手動清除記錄
4. 確認可以重新嘗試登入

此功能大幅提升了系統安全性，有效防止了暴力破解攻擊。 