import type { Metadata } from "next";
import "./globals.css";
import { ModalProvider } from "@/components/ModalContext";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import { Noto_Sans_TC } from "next/font/google";
import { headers } from "next/headers";

// 設定字體
const notoSansTC = Noto_Sans_TC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-tc",
});

// 直接從數據庫獲取favicon數據
async function getFavicon() {
  let favicon = "/favicon.ico"; // 默認值

  try {
    // 獲取當前主機名
    const host =
      process.env.NEXT_PUBLIC_API_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    // 使用完整URL調用API
    const response = await fetch(`${host}/api/get-favicon`, {
      method: "GET",
      next: { revalidate: 3600 }, // 重新驗證時間：1小時
    });

    if (response.ok) {
      const data = await response.json();
      if (data.favicon) {
        favicon = data.favicon;
      }
    }
  } catch (error) {
    console.error("獲取favicon失敗:", error);
  }

  return favicon;
}

// 取得favicon的函數
export async function generateMetadata(): Promise<Metadata> {
  // 獲取favicon
  const favicon = await getFavicon();

  return {
    title: "師資培育國際學術研討會",
    description: "探討全球師資培育發展趨勢與創新教學實踐",
    keywords: "師資培育, 國際研討會, 教育創新, 教學實踐 ,ICTE",
    authors: [{ name: "師資培育中心" }],
    openGraph: {
      title: "師資培育國際學術研討會",
      description: "探討全球師資培育發展趨勢與創新教學實踐",
      type: "website",
      locale: "zh_TW",
    },
    twitter: {
      card: "summary_large_image",
      title: "師資培育國際學術研討會",
      description: "探討全球師資培育發展趨勢與創新教學實踐",
    },
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning className={notoSansTC.variable}>
      <head>
        {/* 預加載關鍵圖片 */}
        <link rel="preload" as="image" href="/banner/Group.png" />
      </head>
      <body>
        <ModalProvider>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </ModalProvider>
      </body>
    </html>
  );
}
