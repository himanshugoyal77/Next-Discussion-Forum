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

  const active =
    "relative bg-[#2C353D] text-white text-black font-semibold rounded-r-md";

  return (
    <div
      className={`
      fixed bg-[#1E212A] w-[60%] h-full left-0 z-[998] top-12 ${
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
          transition-all duration-300 ease-in-out rounded-md
          fade-in-100 fade-out-0
          px-4 h-12 text-start 
          flex items-center justify-start
          cursor-pointer ${pathname === "/" ? active : "text-gray-300"}`}
        >
          <div
            className={`flex items-center justify-center gap-[10px] ${
              pathname === "/" ? "text-[#FF6934]" : ""
            }`}
          >
            <Home height={20} width={20} />
            <p>Feed</p>
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
          <div
            className={`flex items-center justify-center gap-[10px] ${
              pathname === "/about" ? "text-[#FF6934]" : ""
            }`}
          >
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
    </div>
  );
};

export default SidebarMobile;
