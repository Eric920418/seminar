"use client";
import { usePathname } from "next/navigation";
import { useModalContext } from "@/components/ModalContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isModalOpen } = useModalContext();
  const pathname = usePathname();

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
