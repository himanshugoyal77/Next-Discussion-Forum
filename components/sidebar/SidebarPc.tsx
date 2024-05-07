"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@/lib/context/sidebarSlice";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { HomeIcon, Pencil2Icon } from "@radix-ui/react-icons";
import {
  Contact,
  HammerIcon,
  Home,
  Info,
  Pencil,
  PencilIcon,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { upload } from "@/lib/utils";
import { toast } from "sonner";
import { duration } from "moment";
import { Skeleton } from "../ui/skeleton";
import axios from "axios";

const SidebarPc = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const { push } = useRouter();
  const [profileImage, setProfileImage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
    const url = localStorage.getItem("user_image");
    setProfileImage(url! || user?.imageUrl!);
  }, []);

  if (loading) return <Skeleton className="w-[100px] h-[20px] rounded-sm" />;

  const active =
    "relative bg-[#2C353D] text-white text-black font-semibold rounded-r-md";

  return (
    <div className="w-[200px] h-min bg-[#262D34] rounded-xl p-2 flex flex-col mt-20 fixed z-10 top-0">
      <div
        onClick={() => {
          push("/");
          //dispatch(toggle());
        }}
        className={`
          transition-all duration-300 ease-in-out rounded-md
          fade-in-100 fade-out-0
          px-4 h-12 text-start 
          flex items-center justify-start
          cursor-pointer ${pathname === "/" ? active : "text-gray-300"}`}
      >
        <div className="flex items-center justify-center gap-[10px]">
          <Home height={20} width={20} />
          Feed
        </div>
        {/* <div
          className={`
            ${
              pathname === "/"
                ? "absolute left-0 h-5 w-5 triangle z-40 bg-[#020817]"
                : "hidden"
            }`}
        ></div> */}
      </div>
      <div
        onClick={() => {
          push("/about");
        }}
        className={`
          transition-all duration-300 ease-in-out rounded-md
          fade-in-100 fade-out-0
          px-4 h-12 text-start
          flex items-center justify-start
          cursor-pointer ${pathname === "/about" ? active : "text-gray-300"}`}
      >
        <div className="flex items-center justify-center gap-[10px]">
          <Info height={20} width={20} />
          Community
        </div>
      </div>
      <div
        onClick={() => {
          push("/contact");
        }}
        className={`
          transition-all duration-300 ease-in-out rounded-md
          fade-in-100 fade-out-0
          px-4 h-12 text-start
          flex items-center justify-start
          cursor-pointer ${pathname === "/contact" ? active : "text-gray-300"}`}
      >
        <div className="flex items-center justify-center gap-[10px]">
          <Contact height={20} width={20} />
          Settings
        </div>
      </div>
      <div
        onClick={() => {
          push("/contact");
        }}
        className={`
          transition-all duration-300 ease-in-out rounded-md
          fade-in-100 fade-out-0
          px-4 h-12 text-start
          flex items-center justify-start
          cursor-pointer ${
            pathname === "/liive-chat" ? active : "text-gray-300"
          }`}
      >
        <div className="flex items-center justify-center gap-[10px]">
          <Contact height={20} width={20} />
          Live Chat
        </div>
      </div>
      <div
        onClick={() => {
          push("/contact");
        }}
        className={`
          transition-all duration-300 ease-in-out rounded-md
          fade-in-100 fade-out-0
          px-4 h-12 text-start
          flex items-center justify-start
          cursor-pointer ${pathname === "/my-qna" ? active : "text-gray-300"}`}
      >
        <div className="flex items-center justify-center gap-[10px]">
          <Contact height={20} width={20} />
          My QnA
        </div>
      </div>
    </div>
  );
};

export default SidebarPc;
