import { MainVision } from "@/components/Homepage/MainVision";
import { NewVision } from "@/components/Homepage/NewVision";
import { TimeVision } from "@/components/Homepage/TimeVision";
import { ConferenceVision } from "@/components/Homepage/ConferenceVision";
import { VideoVision } from "@/components/Homepage/VideoVision";
import { OrganizersVision } from "@/components/Homepage/OrganizersVision";
import Image from "next/image";
export default function Home() {
  return (
    <div className="bg-[#FAFBFD]">
      <MainVision />
      <NewVision />
      <TimeVision />
      <ConferenceVision />
      <VideoVision />
      <OrganizersVision />
    </div>
  );
}
