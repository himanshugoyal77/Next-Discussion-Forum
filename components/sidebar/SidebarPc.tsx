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

  const active = "relative bg-slate-50 text-black font-semibold rounded-r-md";

  const handleFile1 = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const files = e.target?.files;
      if (files?.length! > 0) {
        const data = new FormData();
        // @ts-ignore
        for (const file of files!) {
          data.append("file", file);
        }
        data.append("upload_preset", "h-forum");
        const url = await upload(data);
        setProfileImage(url);
        console.log("url", profileImage);
      }
      axios
        .put("/api/user", {
          id: user?.id,
          imageUrl: profileImage,
        })
        .then((res) => {
          toast.success(res.data.msg, {
            duration: 5000,
            action: {
              label: "Close",
              onClick: () => {},
            },
          });
        });
    } catch (error) {
      toast("Failed to upload image", {
        duration: 5000,

        onAutoClose: () => {},
        action: {
          label: "Undo",
          onClick: () => {},
        },
      });
    }
  };

  return (
    <div className="w-[256px] flex flex-col gap-y-2 mt-20 fixed z-10 h-screen top-0">
      <div className="user flex flex-col items-center my-4">
        <div className="relative mb-3 ">
          <label
            className="mx-auto
            h-[115px] w-[115px]
            flex flex-col items-center justify-center rounded-full
                cursor-pointer border-dashed border-2 border-slate-600"
          >
            <Image
              fill
              objectFit="cover"
              className="rounded-full border-dashed border-2 border-slate-600"
              src={profileImage}
              alt="user-image"
            />
            <input
              onChange={handleFile1}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>
          <div className="absolute right-1 bottom-1 h-6 w-6 flex items-center justify-center rounded-full bg-[#242424]">
            <Pencil fill="grey" height={12} width={12} />
          </div>
        </div>
        <p className="text-slate-500 text-sm flex items-center gap-2">
          @
          {user?.primaryEmailAddress?.emailAddress?.split("@")[0] || (
            <Skeleton className="w-[100px] h-[20px] rounded-sm" />
          )}
        </p>
        <div className="text-white flex items-center justify-center">
          👋{" "}
          {user?.fullName || (
            <Skeleton className="w-[140px] h-[20px] rounded-sm" />
          )}
        </div>
      </div>
      <div
        onClick={() => {
          push("/");
          //dispatch(toggle());
        }}
        className={`
          transition-all duration-300 ease-in-out
          fade-in-100 fade-out-0
          px-4 h-12 text-start
          flex items-center justify-start
          cursor-pointer ${pathname === "/" ? active : "bg-[#1E212A]"}`}
      >
        <div className="flex items-center justify-center gap-2">
          <Home height={22} width={22} />
          Feed
        </div>
        <div
          className={`
            ${
              pathname === "/"
                ? "absolute left-0 h-5 w-5 triangle z-40 bg-[#020817]"
                : "hidden"
            }`}
        ></div>
      </div>
      <div
        onClick={() => {
          push("/about");
        }}
        className={`
          transition-all duration-300 ease-in-out
          fade-in-100 fade-out-0
          px-4 h-12 text-start
          flex items-center justify-start
          cursor-pointer ${pathname === "/about" ? active : "bg-[#1E212A]"}`}
      >
        <div className="flex items-center justify-center gap-2">
          <Info height={22} width={22} />
          Community
        </div>
        <div
          className={`
            ${
              pathname === "/about"
                ? "absolute left-0 h-4 w-5 triangle z-40 bg-[#020817]"
                : "hidden"
            }`}
        ></div>
      </div>
      <div
        onClick={() => {
          push("/contact");
        }}
        className={`
          transition-all duration-300 ease-in-out
          fade-in-100 fade-out-0
          px-4 h-12 text-start
          flex items-center justify-start
          cursor-pointer ${pathname === "/contact" ? active : "bg-[#1E212A]"}`}
      >
        <div className="flex items-center justify-center gap-2">
          <Contact height={22} width={22} />
          Settings
        </div>
        <div
          className={`
            ${
              pathname === "/contact"
                ? "absolute left-0 h-4 w-5 triangle z-40 bg-[#020817]"
                : "hidden"
            }`}
        ></div>
      </div>
      <div
        onClick={() => {
          push("/contact");
        }}
        className={`
          transition-all duration-300 ease-in-out
          fade-in-100 fade-out-0
          px-4 h-12 text-start
          flex items-center justify-start
          cursor-pointer ${
            pathname === "/liive-chat" ? active : "bg-[#1E212A]"
          }`}
      >
        <div className="flex items-center justify-center gap-2">
          <Contact height={22} width={22} />
          Live Chat
        </div>
        <div
          className={`
            ${
              pathname === "/live-chat"
                ? "absolute left-0 h-4 w-5 triangle z-40 bg-[#020817]"
                : "hidden"
            }`}
        ></div>
      </div>
      <div
        onClick={() => {
          push("/contact");
        }}
        className={`
          transition-all duration-300 ease-in-out
          fade-in-100 fade-out-0
          px-4 h-12 text-start
          flex items-center justify-start
          cursor-pointer ${pathname === "/my-qna" ? active : "bg-[#1E212A]"}`}
      >
        <div className="flex items-center justify-center gap-2">
          <Contact height={22} width={22} />
          My QnA
        </div>
        <div
          className={`
            ${
              pathname === "/my-qna"
                ? "absolute left-0 h-4 w-5 triangle z-40 bg-[#020817]"
                : "hidden"
            }`}
        ></div>
      </div>
    </div>
  );
};

export default SidebarPc;
