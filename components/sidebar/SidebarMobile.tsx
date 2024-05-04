import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "@/lib/context/sidebarSlice";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { HomeIcon } from "@radix-ui/react-icons";
import { Contact, Home, Info } from "lucide-react";

const SidebarMobile = () => {
  const pathname = usePathname();
  const { push } = useRouter();

  // @ts-ignore
  const open = useSelector((state) => state.sidebar.open);
  const dispatch = useDispatch();

  const active = "relative bg-slate-50 text-black font-semibold rounded-r-md";
  return (
    <div
      className={`
      fixed bg-[#1E212A] w-[60%] h-full left-0 ${
        open ? "translate-x-0" : "-translate-x-full"
      } transition-all duration-300 ease-in-out md:hidden`}
    >
      <div className="flex flex-col gap-y-2 mt-20 px-3 bg-[#1E212A]">
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
          <div className="flex items-center justify-center gap-1">
            <Home height={22} width={22} />
            Home
          </div>
          <div
            className={`
            ${
              pathname === "/"
                ? "absolute left-0 h-5 w-5 triangle z-40 bg-[#1E212A]"
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
          <div className="flex items-center justify-center gap-1">
            <Info height={22} width={22} />
            About
          </div>
          <div
            className={`
            ${
              pathname === "/about"
                ? "absolute left-0 h-4 w-5 triangle z-40 bg-[#1E212A]"
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
          <div className="flex items-center justify-center gap-1">
            <Contact height={22} width={22} />
            Contact
          </div>
          <div
            className={`
            ${
              pathname === "/contact"
                ? "absolute left-0 h-4 w-5 triangle z-40 bg-[#1E212A]"
                : "hidden"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMobile;
