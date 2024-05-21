import { Search } from "lucide-react";
import {
  activeColor,
  bgSecondary,
  primaryColor,
  themeColor,
} from "../constants";

export function InputWithButton() {
  return (
    <div
      className={`flex w-full  bg-[${activeColor}] h-6 items-center justify-between px-4 
      py-5 rounded-xl outline-none border-transparent focus:border-transparent focus-within:ring-2 focus-within:ring-[#FF6934] focus:border-[#FF6934] `}
    >
      <input
        type="text"
        placeholder="Search"
        className="w-full border-none bg-transparent ring-0 focus:ring-0 focus:border-none focus:outline-none"
      />
      <Search height={20} width={20} color="grey" />
    </div>
  );
}
