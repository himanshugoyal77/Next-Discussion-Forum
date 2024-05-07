"use client";

import {
  SignedOut,
  SignedIn,
  SignOutButton,
  useUser,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "./ToggleButton";
import {
  AlignStartVertical,
  AlignStartVerticalIcon,
  Bell,
  HammerIcon,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@/lib/context/sidebarSlice";
import { User } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { InputWithButton } from "./home/Searchbar";

const Header = () => {
  const { user } = useUser();
  const { resolvedTheme } = useTheme();

  // const dispatch = useDispatch();
  // // @ts-ignore
  // const open = useSelector((state) => state.sidebar.open);

  return (
    <nav className="w-full bg-[#262D34] mx-24 my-2 flex items-center justify-between">
      <div className="logo cursor-pointer w-full flex items-center justify-start gap-3">
        <AlignStartVerticalIcon height={22} width={22} color="#FF6934" />
        <h1 className="text-2xl font-bold text-[#FF6934]">H-Forum</h1>
      </div>
      <div className="w-full">
        <InputWithButton />
      </div>
      <div className="w-full flex items-center justify-end gap-3">
        <div className="w-6 h-6 relative mr-2">
          <Bell
            height={22}
            width={22}
            fill="white"
            className="absolute top-0 left-0 bottom-0 right-0 cursor-pointer"
          />
          <div className="absolute h-2 w-2 bg-red-700 rounded-full top-0 right-1 z-10"></div>
        </div>
        <UserButton
          appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : undefined,
          }}
        />
        <h2>{user?.fullName}</h2>
      </div>
    </nav>
  );
};

export default Header;
