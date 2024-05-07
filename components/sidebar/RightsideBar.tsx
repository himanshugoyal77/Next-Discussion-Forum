"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import { upload } from "@/lib/utils";

const RightsideBar = () => {
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
    <div className="user flex flex-col items-center justify-center my-4">
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
  );
};

export default RightsideBar;
