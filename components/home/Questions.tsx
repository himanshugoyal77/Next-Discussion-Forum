import { useUser } from "@clerk/nextjs";
import {
  EllipsisVertical,
  MessageSquareText,
  SendHorizontal,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import React from "react";

export interface IQuestion {
  question: {
    _id: string;
    question: string;
    description: string;
    updatedAt: string;
  };
}

const Questions = ({ question }: IQuestion) => {
  const { user } = useUser();
  return (
    <div
      className="flex flex-col shadow-sm shadow-[#242424]
    bg-white dark:bg-gray-800 dark:text-white
    mt-5
max-h-min w-[70%] justify-start items-start rounded-xl p-4
"
    >
      <div className="w-full flex items-start justify-between">
        <div className="user_icon flex items-center justify-center gap-x-2">
          <Image
            src={user?.imageUrl!}
            alt="user"
            width={42}
            height={42}
            className="rounded-full"
          />
          <div className="flex flex-col items-start justify-center">
            <p className="font-bold text-lg">{user?.fullName!}</p>
            <p className="text-slate-200 text-sm font-normal">2 hours ago</p>
          </div>
        </div>
        <div className="ring-1 ring-gray-500 rounded-full h-8 w-8 flex items-center justify-center">
          <EllipsisVertical height={16} width={16} />
        </div>
      </div>
      <div className="mt-4">
        <p className="text-lg font-bold">
          {question.question}
          {/* What is the best way to learn React.js? */}
        </p>
        <p className="text-slate-200 text-sm mt-2">
          {question.description}
          {/* I am a beginner and I want to learn React.js. What is the best way to
          learn React.js? Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Reprehenderit, rerum ullam? Facilis, iusto eum culpa accusantium
          dolore nulla provident veritatis! */}
        </p>
      </div>
      <div className="w-full mt-5 flex items-center justify-between">
        <div className="flex items-center gap-x-6">
          <button className="flex items-center gap-x-1">
            <ThumbsUp height={22} width={22} />
            <p className="font-bold">12</p>
          </button>
          <button className="flex items-center justify-center gap-x-2">
            <ThumbsDown className="mt-2" height={22} width={22} />
            <p className="font-semibold">2</p>
          </button>
          <button className="flex items-center gap-x-1">
            <SendHorizontal
              className="text-gray-200"
              style={{ transform: "rotate(-45deg)" }}
              height={21}
              width={21}
            />
            <p className="font-normal text-gray-200">Share</p>
          </button>
        </div>
        <button className="flex items-end gap-x-2">
          <MessageSquareText height={22} width={22} />
          <p>Comment</p>
        </button>
      </div>
    </div>
  );
};

export default Questions;
