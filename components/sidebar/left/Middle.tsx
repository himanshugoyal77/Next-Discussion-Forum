import React from "react";
import Image from "next/image";

const MiddleBar = () => {
  const pathname = "/popular";

  const active =
    "relative bg-[#2C353D] text-white text-black font-semibold rounded-r-md";

  return (
    <div className="w-full h-min bg-[#262D34] rounded-xl p-2 flex flex-col mt-4">
      <div
        className={`
          transition-all duration-300 ease-in-out rounded-md
          fade-in-100 fade-out-0
          px-4 h-12 text-start 
          flex items-center justify-start
          cursor-pointer ${pathname === "/" ? active : "text-gray-300"}`}
      >
        <div
          className={`flex items-center justify-center gap-[4px] ${
            pathname === "/" ? "text-[#FF6934]" : ""
          }`}
        >
          <Image src="/history.png" height={30} width={30} alt="image" />
          <p>Recent</p>
        </div>
      </div>
      <div
        className={`
          transition-all duration-300 ease-in-out rounded-md
          fade-in-100 fade-out-0
          px-4 h-12 text-start 
          flex items-center justify-start
          cursor-pointer ${pathname === "/popular" ? active : "text-gray-300"}`}
      >
        <div
          className={`flex items-center justify-center gap-[10px] ${
            pathname === "/popular" ? "text-[#FF6934]" : ""
          }`}
        >
          <Image src="/fire.png" height={22} width={22} alt="image" />
          <p>Popular</p>
        </div>
      </div>
      <div
        className={`
          transition-all duration-300 ease-in-out rounded-md
          fade-in-100 fade-out-0
          px-4 h-12 text-start 
          flex items-center justify-start
          cursor-pointer ${
            pathname === "/following" ? active : "text-gray-300"
          }`}
      >
        <div
          className={`flex items-center justify-center gap-[10px] ${
            pathname === "following" ? "text-[#FF6934]" : ""
          }`}
        >
          <Image src="/add-friend.png" height={22} width={22} alt="image" />
          <p>Following</p>
        </div>
      </div>
    </div>
  );
};

export default MiddleBar;
