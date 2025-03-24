"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useModalContext } from "@/components/ModalContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const query = `
  query color {
    color {
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
  });
  const { isModalOpen } = useModalContext();
  const pathname = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/api/graphql", {
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
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-primary",
      editorColor.editor1
    );
    document.documentElement.style.setProperty(
      "--color-secondary",
      editorColor.editor2
    );
    document.documentElement.style.setProperty(
      "--color-third",
      editorColor.editor3
    );
    document.documentElement.style.setProperty(
      "--color-black",
      editorColor.editor4
    );
    document.documentElement.style.setProperty(
      "--color-white",
      editorColor.editor5
    );
    document.documentElement.style.setProperty("--color-warning", "#ff6231");
  }, [editorColor]);
  // 判斷是否為 admin 路由
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && !isModalOpen && <Header />}
      {children}
      {!isAdminPage && !isModalOpen && <Footer />}
    </>
  );
}
