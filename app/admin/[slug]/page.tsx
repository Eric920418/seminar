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
export default function Page() {
  const params = useParams();
  const { slug } = params;

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

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-10 flex-1">
        {EditPages.find((item) => item.slug === slug)?.component}
      </div>
    </div>
  );
}
