"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

import { Pencil } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import { upload } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const Topbar = () => {
  const { user } = useUser();
  const [profileImage, setProfileImage] = React.useState<string>("");
  const [mounted, setMounted] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
    const url = localStorage.getItem("user_image");
    setProfileImage(url! || user?.imageUrl!);
  }, []);

  if (loading) return <Skeleton className="w-[100px] h-[20px] rounded-sm" />;

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
    <div className="w-full bg-[#262D34] rounded-xl py-2">
      <div className="user flex flex-col items-center justify-center my-2">
        <p className="text-white text-sm flex items-center gap-2">
          <Image src="/wave.png" height={20} width={20} alt="image" />@
          {user?.primaryEmailAddress?.emailAddress?.split("@")[0] || (
            <Skeleton className="w-[100px] h-[20px] rounded-sm" />
          )}
        </p>
        <div className="w-full px-6 flex justify-around items-center mt-2">
          <div className="followers flex flex-col items-center justify-center gap-1">
            <p className="text-white text-2xl font-bold">120</p>
            <p className="text-white text-sm">Followers</p>
          </div>
          <div className="following flex flex-col items-center justify-center gap-1">
            <p className="text-white text-2xl font-bold">34</p>
            <p className="text-white text-sm">Following</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
