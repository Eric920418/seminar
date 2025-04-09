"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col">
      <div
        className={`bg-gray-800 text-white ${
          isOpen ? "w-64" : "w-16"
        } flex-1  transition-all min-h-screen`}
      >
        <div className="flex items-center justify-end p-4">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <nav className="mt-4 space-y-2">
            <Link
              href="/admin/home-page"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              最新消息
            </Link>
            <Link
              href="/admin/meeting"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              ICTE​會議​資訊
            </Link>
            <Link
              href="/admin/speech"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              主​題演講
            </Link>
            <Link
              href="/admin/forum"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              圓桌論壇
            </Link>
            <Link
              href="/admin/work"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              微型工作坊
            </Link>
            <Link
              href="/admin/exhibition"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              創新教材教具展
            </Link>
            <Link
              href="/admin/papers"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              ICTE論文
            </Link>
            <Link
              href="/admin/video"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              影片專區
            </Link>
            <div className="border-t border-gray-700 mt-4"></div>
            <Link
              href="/admin/event"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              活動
            </Link>
            <Link
              href="/admin/host"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              講師
            </Link>
            <Link
              href="/admin/logo"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              Logo/Footer
            </Link>
            <Link
              href="/admin/color"
              className="block px-4 py-2 hover:bg-gray-700"
            >
              顏色
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
};
