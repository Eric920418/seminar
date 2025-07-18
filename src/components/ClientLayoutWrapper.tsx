"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useModalContext } from "@/components/ModalContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MoveToTop } from "@/components/MoveToTop";
import { updateFavicon } from "@/utils/faviconUpdater";

const query = `
  query color {
    color {
      section1
    }
    logo {
      section1
    }
  }
`;

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [editorColor, setEditorColor] = useState({
    editor1: "",
    editor2: "",
    editor3: "",
    editor4: "",
    editor5: "",
    editor6: "",
  });
  const [favicon, setFavicon] = useState<string | null>(null);
  const { isModalOpen } = useModalContext();
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  // 1. 取得顏色設定 好
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();

      setEditorColor({
        editor1: data.color[0].section1.primary,
        editor2: data.color[0].section1.secondary,
        editor3: data.color[0].section1.third,
        editor4: data.color[0].section1?.black,
        editor5: data.color[0].section1?.white,
        editor6: data.color[0].section1?.warning,
      });

      setFavicon(data.logo[0].section1?.favicon);
    };

    fetchData();
  }, []);

  // 2. 使用統一的favicon更新函數
  useEffect(() => {
    if (favicon) {
      updateFavicon(favicon);
    }
  }, [favicon]);

  // 3. 套用 CSS 變數
  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty("--color-primary", editorColor.editor1);
    root.setProperty("--color-secondary", editorColor.editor2);
    root.setProperty("--color-third", editorColor.editor3);
    root.setProperty("--color-black", editorColor.editor4);
    root.setProperty("--color-white", editorColor.editor5);
    root.setProperty("--color-warning", editorColor.editor6 || "#ff6231");
  }, [editorColor]);

  return (
    <>
      {!isAdminPage && !isModalOpen && <Header />}
      {children}
      {!isAdminPage && !isModalOpen && <Footer />}
      {!isAdminPage && !isModalOpen && <MoveToTop />}
    </>
  );
}
