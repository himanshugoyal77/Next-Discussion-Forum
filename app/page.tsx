"use client";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { ModeToggle } from "@/components/ToggleButton";
import Arrowdown from "@/icons/Arrowdown";
import axios from "axios";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Write from "@/icons/Write";
import Send from "@/icons/Send";
import UserInfo from "@/components/home/UserInfo";
import { useUser } from "@clerk/nextjs";
import Questions from "@/components/home/Questions";
import { IQuestion } from "@/components/home/Questions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function Home() {
  const { user } = useUser();
  const [answer, setAnswer] = React.useState("");
  const [openId, setOpenId] = useState([]);

  const memoizedCallback = React.useCallback(() => {
    if (!user) {
      return;
    }
    const { fullName, imageUrl, firstName, lastName } = user;
    const { emailAddresses } = user;
    const emailAddress = emailAddresses[0].emailAddress;
    const id = emailAddresses[0].id;
    axios
      .post("/api/user", {
        id,
        fullName,
        imageUrl,
        firstName,
        lastName,
        emailAddress,
      })
      .then((res) => {
        if (res.data.msg === "User already exists") return;
        toast.success(res.data.msg, {
          duration: 5000,
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      })
      .catch((err) => {
        toast.error(err.response.data.error, {
          duration: 5000,
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      });
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      memoizedCallback();
    }, 1000);
    return () => clearTimeout(timer);
  }, [user]);

  const { isLoading, data, isError, error, isFetching } = useQuery(
    "getAllQuestions",
    () => {
      return axios.get("/api/posts").then((res) => res.data.data);
    }
  );
  console.log("Data", data);
  if (isLoading) return <Loading />;

  return (
    <>
      {data &&
        data.map((question: IQuestion) => (
          <Questions key={question?._id!} question={question} />
        ))}
    </>
  );
}
