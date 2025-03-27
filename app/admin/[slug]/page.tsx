"use client";

import { useParams } from "next/navigation";
import { Sidebar } from "@/components/Admin/Sidebar";
import { HomePage } from "@/components/Edit/HomePage";
import { Work } from "@/components/Edit/Work";
import { Speech } from "@/components/Edit/Speech";
import { Papers } from "@/components/Edit/Papers";
import { Video } from "@/components/Edit/Video";
import { Exhibition } from "@/components/Edit/Exhibition";
import { Meeting } from "@/components/Edit/Meeting";
import { Forum } from "@/components/Edit/Forum";
import { Host } from "@/components/Edit/Host";
import { Event } from "@/components/Edit/Event";
import { Logo } from "@/components/Edit/Logo";
import { Color } from "@/components/Edit/Color";
import { useState, useEffect } from "react";

export default function Page() {
  const params = useParams();
  const { slug } = params;

  const [login, setLogin] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [dashboardFade, setDashboardFade] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const EditPages = [
    { slug: "home-page", component: <HomePage /> },
    { slug: "work", component: <Work /> },
    { slug: "speech", component: <Speech /> },
    { slug: "papers", component: <Papers /> },
    { slug: "video", component: <Video /> },
    { slug: "exhibition", component: <Exhibition /> },
    { slug: "meeting", component: <Meeting /> },
    { slug: "forum", component: <Forum /> },
    { slug: "host", component: <Host /> },
    { slug: "event", component: <Event /> },
    { slug: "logo", component: <Logo /> },
    { slug: "color", component: <Color /> },
  ];

  // 初次渲染時檢查 localStorage 是否存在登入狀態
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setLogin(true);
      setDashboardFade(true);
    }
  }, []);

  const handUsername = (e: any) => {
    setUsername(e.target.value);
  };

  const handPassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handLoginButton = () => {
    if (username === "ictesite" && password === "icteadmin_62139") {
      setFadeOut(true);
      setTimeout(() => {
        setLogin(true);
        setDashboardFade(true);
        // 儲存登入狀態至 localStorage
        localStorage.setItem("isLoggedIn", "true");
      }, 500);
    } else {
      alert("帳號或密碼錯誤");
    }
  };

  return (
    <div>
      {!login ? (
        <div
          className={`flex justify-center items-center h-screen transition-opacity duration-500 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">登錄</h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                使用者名稱
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="請輸入使用者名稱"
                onChange={handUsername}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                密碼
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="請輸入密碼"
                onChange={handPassword}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handLoginButton}
              >
                登錄
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`flex transition-opacity duration-500 ${
            dashboardFade ? "opacity-100" : "opacity-0"
          }`}
        >
          <Sidebar />
          <div className="p-10 flex-1">
            {EditPages.find((item) => item.slug === slug)?.component}
          </div>
        </div>
      )}
    </div>
  );
}
