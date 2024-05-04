"use client";

import { SignedOut, SignedIn, SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "./ToggleButton";
import {
  AlignStartVertical,
  AlignStartVerticalIcon,
  HammerIcon,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@/lib/context/sidebarSlice";

const Header = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  // @ts-ignore
  const open = useSelector((state) => state.sidebar.open);

  return (
    <nav
      className="
      fixed bg-white dark:bg-[#1E212A]
     top-0 left-0 right-0 z-10 h-14  shadow-md  flex items-center justify-between
     px-4
     md:px-20
    "
    >
      <div className="md:hidden flex items-center justify-center">
        <div
          onClick={() => dispatch(toggle())}
          className="cursor-pointer mr-3 relative
        "
        >
          <AlignStartVerticalIcon
            height={24}
            width={24}
            // transition-animation
            className={`${
              !open
                ? "transition-all ease-in-out duration-200 opacity-100 fade-in-40 absolute top-0 left-0"
                : "opacity-0 "
            }`}
          />

          <X
            height={24}
            width={24}
            className={` ${
              open
                ? "transition-all ease-in-out transform rotate-0 duration-500 opacity-100 fade-out-25 absolute top-0 left-0"
                : "transition-all ease-in-out transform duration-500 opacity-0 rotate-45"
            }`}
          />
        </div>
        <Link href="/">
          <div className="text-lg uppercase font-bold text-white">H-forum</div>
        </Link>
      </div>
      <div className="hidden md:flex items-center justify-center">
        <AlignStartVerticalIcon height={24} width={24} />
        <Link href="/">
          <div className="ml-3 text-lg uppercase font-bold text-white">
            H-forum
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-between gap-4">
        <ModeToggle />
        <SignedOut>
          <div className="text-white">
            <Link
              href="sign-in"
              className="text-gray-300 hover:text-white mr-4"
            >
              Sign In
            </Link>
            <Link
              href="sign-up"
              className="text-gray-300 hover:text-white mr-4"
            >
              Sign Up
            </Link>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="text-white">
            <Link
              href="/profile"
              className="text-gray-300 hover:text-white mr-4"
            >
              Profile
            </Link>
            <SignOutButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Header;
