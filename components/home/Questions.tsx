import { useUser } from "@clerk/nextjs";
import { HoverCard } from "@radix-ui/react-hover-card";
import {
  CornerDownRight,
  EllipsisVertical,
  Link,
  MessageSquareText,
  SendHorizontal,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useEffect } from "react";
import { HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  emailAddresses: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IQuestion {
  _id: string;
  question: string;
  description: string;
  createdAt: string;
  downvote: [];
  upvote: [];
  tags: [string];
  replies: [];
  author: IUser | null;
}

const Questions = (quest: any) => {
  console.log(quest);
  const { question, description, author } = quest;
  const [showReply, setShowReply] = React.useState(false);
  const { user } = useUser();
  const queryClient = useQueryClient();
  const commentRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      axios.get(`/api/user/${user?.id}`).then((res) => {
        localStorage.setItem("userId", res.data.data?._id);
      });
    }
  }, [user]);

  const mutation = useMutation({
    mutationKey: ["addComment"],
    mutationFn: (comment: Object) =>
      axios.put(`/api/posts`, {
        questionId: question._id,
        userId: localStorage.getItem("userId"),
        comment: comment,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("getAllQuestions");
    },
  });

  const addComment = async (comment: String, questionId: String) => {
    try {
      const res = await mutation.mutateAsync(comment);
      console.log("res", res);
      if (res.status === 201) {
        toast.success("Reply added successfully", {
          duration: 2000,
          dismissible: true,
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        duration: 5000,
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
  };

  return (
    <div
      className="flex flex-col shadow-sm shadow-[#242424]
     bg-[#1E212A] text-white
    mb-4 md:mb-5
max-h-min w-full md:w-[97%] justify-start items-start rounded-xl p-3 md:p-4
"
    >
      <div className="w-full flex items-start justify-">
        <div className="w-[90%]">
          <p className="text-lg font-bold">{question.question}</p>
          <p className="text-slate-200 text-sm mt-1">{question.description}</p>
          <div className="flex flex-wrap">
            {question.tags.map((tag: string, index: number) => (
              <div
                key={index}
                className="bg-[#2C353D] text-[#FF6934] px-3 py-1 rounded-full text-sm mt-4 mr-2"
              >
                <a href={`/query?tag=${tag}`}>{tag}</a>
              </div>
            ))}
          </div>
        </div>
        <div className="cursor-pointer ml-auto rounded-full h-8 w-8 flex items-center justify-center">
          <EllipsisVertical height={16} width={16} />
        </div>
      </div>

      <div className="w-full mt-3 flex flex-col-reverse gap-3 md:gap-0 md:flex-row items-center justify-between">
        <div
          className="user_icon flex items-center justify-center gap-x-2
        ml-auto md:ml-0
        "
        >
          <div className="w-full md:hidden">
            <CornerDownRight height={12} width={12} />
          </div>
          <Image
            src={question.author?.imageUrl!}
            alt="user"
            width={30}
            height={30}
            className="rounded-full"
          />
          <div className="flex flex-col items-start justify-center text-sm ">
            <p className="">
              @{`${question.author?.emailAddress.split("@")[0]}`}
            </p>
            <p className="text-xs font-normal text-gray-400">
              {moment(question.createdAt).fromNow()}
            </p>
          </div>{" "}
        </div>

        <div className="flex items-center gap-x-4 md:gap-x-6 mr-auto md:mr-0">
          <button className="flex items-center gap-x-1">
            <ThumbsUp height={22} width={22} />
            <p className="font-bold">{question.upvote.length}</p>
          </button>
          <button className="flex items-center justify-center gap-x-2">
            <ThumbsDown className="mt-2" height={22} width={22} />
            <p className="font-semibold">{question.downvote.length}</p>
          </button>
          <HoverCardComponent id={question._id}>
            <SendHorizontal
              className="text-gray-200 cursor-pointer"
              style={{ transform: "rotate(-45deg)" }}
              height={21}
              width={21}
            />
          </HoverCardComponent>
          <button
            onClick={() => setShowReply(!showReply)}
            className="flex items-end gap-x-2"
          >
            <MessageSquareText height={22} width={22} />
            <p>
              {`${question.replies.length} ${
                question.replies.length > 0 ? "replies" : "replay"
              }`}{" "}
            </p>
          </button>
        </div>
      </div>
      <div className="w-full">
        {
          <div
            className={`w-full flex flex-col ${showReply ? "block" : "hidden"}`}
          >
            <div className="flex items-center justify-center gap-3 mt-4">
              <hr className="w-full opacity-10" />
              replies
            </div>
            {question.replies.map((reply: any, index: number) => (
              <div
                key={index}
                className="w-full flex items-center gap-2 mt-2 md:mt-4"
              >
                {/* <CornerDownRight height={18} width={18} /> */}
                <div
                  className="min-w-min max-w-md flex flex-col
                  bg-[#2C353D] p-4 rounded-xl
                  items-start justify-start gap-2"
                >
                  <div className="w-full md:w-[90%] flex items-center gap-2 md:gap-4">
                    <CornerDownRight
                      height={13}
                      width={13}
                      className="min-w-min"
                    />
                    <p className="text-slate-200 text-sm mt-1">
                      {reply.comment}
                    </p>
                  </div>
                  <div className="w-full flex items-center justify-end gap-2">
                    <ThumbsDown
                      height={15}
                      width={15}
                      className="cursor-pointer mr-2 ml-5"
                    />
                    <ThumbsUp
                      height={15}
                      width={15}
                      className="cursor-pointer mr-2"
                    />
                    <Image
                      src={user?.imageUrl!}
                      alt="user"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    <div className="flex flex-col items-start justify-center text-sm ">
                      {/* // thusmbs up and thumbs down */}

                      <p className="">@yash</p>
                      <p className="text-xs font-normal text-gray-400">
                        {moment().fromNow()}
                      </p>
                    </div>{" "}
                  </div>
                </div>
              </div>
            ))}
            <div className={`w-full flex`}>
              <div className="w-[80%] flex items-center gap-2 ml-auto mt-4 ">
                <CornerDownRight />
                <input
                  ref={commentRef}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      if (commentRef.current?.value) {
                        await addComment(
                          commentRef.current.value,
                          question._id
                        );
                        commentRef.current.value = "";
                      } else {
                        toast.error("Please enter a reply");
                      }
                    }
                  }}
                  className="w-full py-1 px-2 rounded-xl border text-black bg-slate-50 focus:outline-none focus:ring-1 focus:ring-white"
                  placeholder="Add a reply"
                />
                <Image
                  src={user?.imageUrl!}
                  alt="user"
                  width={30}
                  height={30}
                  className="rounded-full ml-auto cursor-pointer"
                />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

const HoverCardComponent = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  let hostname: string = "";
  if (typeof window !== "undefined") {
    hostname = window.location.href;
  }

  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="w-full">
          <Input value={`${hostname}query?qid=${id}`} />
          <div className="flex items-center justify-end gap-4 mt-2">
            <div
              className="w-max flex items-center rounded-xl p-2
          bg-[#FF6934] gap-x-2 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(`${hostname}query?qid=${id}`);
                toast.success("Link copied to clipboard");
              }}
            >
              <Link height={18} width={18} />
              <p>Copy Link</p>
            </div>
            <div
              className="w-max cursor-pointer"
              onClick={() =>
                window.open(
                  `https://api.whatsapp.com/send?text=${hostname}query?qid=${id}`
                )
              }
            >
              <Image
                src="/whatsapp.png"
                height={25}
                width={25}
                alt="whatsapp"
              />
            </div>
            <div
              className="w-max cursor-pointer"
              onClick={() =>
                window.open(
                  `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=&su=&body=${hostname}query?qid=${id}`
                )
              }
            >
              <Image src="/gmail.png" height={25} width={25} alt="whatsapp" />
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const MemoizedQuestions = React.memo(Questions);

export default MemoizedQuestions;
