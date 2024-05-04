"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { ModeToggle } from "@/components/ToggleButton";
import Arrowdown from "@/icons/Arrowdown";
import axios from "axios";
import { ArrowUp, SendHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Write from "@/icons/Write";
import Send from "@/icons/Send";
import UserInfo from "@/components/home/UserInfo";

export default function Home() {
  const [answer, setAnswer] = React.useState("");
  const [openId, setOpenId] = useState([]);
  const { isLoading, data } = useQuery("getAllQuestions", () => {
    return axios.get("/api/posts").then((res) => res.data.data);
  });

  console.log("data", data);

  if (isLoading) return <Loading />;

  return (
    <div
      className="flex flex-col items-center gap-y-5 
md:gap-8 my-8 "
    >
      {data.length > 0 &&
        data.map((question: any, index: any) => {
          return (
            <div
              key={index!}
              className="w-[96%] md:w-[80%] mx-12 flex flex-col 
          items-end  p-3 md:p-4 rounded-md bg-purple-100
           dark:bg-slate-400"
            >
              <div
                className="w-full bg-white dark:bg-[#1E212A]
          
          p-4 md:p-5 rounded-lg shadow-md flex items-start gap-5"
              >
                <div className="left-section space-y-1 text-center">
                  <ArrowUp id={question._id} />
                  <h3 className="text-sm md:text-base">
                    {question?.upvote?.length || 0}
                  </h3>
                  <Arrowdown id={question._id} />
                </div>
                <div className="right-section w-full">
                  <h1 className="text-base md:text-lg dark:text-white">
                    {question?.question}
                  </h1>
                  <p className="text-sm md:text-base">
                    {question?.description}
                  </p>
                  <hr />
                  <UserInfo
                    openId={openId}
                    index={index + 1}
                    setOpenId={setOpenId}
                    question={question}
                  />
                </div>
              </div>

              {openId.find((ele) => ele === index + 1) && (
                <>
                  {question?.replies?.map((answer, index) => {
                    console.log("answer", answer);
                    return (
                      <div key={answer._id} className="flex items-center gap-4">
                        {/* fix this */}
                        <img
                          className="h-4 md:h-6 w-4 md:w-6"
                          src="https://cdn.icon-icons.com/icons2/2596/PNG/512/nested_arrows_icon_155086.png"
                          alt=""
                        />
                        <div
                          className="   bg-white dark:bg-[#32353F] dark:text-white
      max-w-xl p-5 rounded-lg shadow-md flex flex-col items-start gap-5 mt-2"
                        >
                          <p className="text-inherit">{answer?.reply}</p>
                          <UserInfo answer={answer} />
                        </div>
                      </div>
                    );
                  })}
                  {/* nested comment       */}
                  <div
                    className="w-full bg-white dark:bg-slate-900 flex items-center gap-4
   px-5 py-2 rounded-lg shadow-md  mt-2"
                  >
                    <Write />
                    <input
                      onChange={(e) => setAnswer(e.target.value)}
                      className="w-full h-10 border-none outline-none 
      rounded-md py-1 px-2 "
                      type="text"
                      value={answer}
                      placeholder="Write a comment"
                    />
                    <Send
                      questionId={question._id}
                      answer={answer}
                      setAnswer={setAnswer}
                    />
                  </div>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
}
