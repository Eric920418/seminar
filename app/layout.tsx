import type { Metadata } from "next";
import "./globals.css";
import { ModalProvider } from "@/components/ModalContext";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import { Noto_Sans_TC } from "next/font/google";

// 設定字體
const notoSansTC = Noto_Sans_TC({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-tc",
});

// 默認favicon路徑
const defaultFavicon = "/favicon.ico";

// 取得metadata的函數
export async function generateMetadata(): Promise<Metadata> {
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
      icon: defaultFavicon,
      shortcut: defaultFavicon,
      apple: defaultFavicon,
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
