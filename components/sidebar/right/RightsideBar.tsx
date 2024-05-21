import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import axios from "axios";
import { BadgePlus } from "lucide-react";
import Image from "next/image";
import Modal from "@/components/Modal";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import Form from "@/components/Form";

const RightsideBar = () => {
  const { isLoading, data, isError, error, isFetching } = useQuery(
    "getNews",
    () => {
      return axios
        .get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
        )
        .then((res) => res.data.articles);
    }
  );

  if (isLoading) return <Loading />;

  return (
    <div className="p-1">
      <CustomButton />
      <div className="rounded-xl mt-4">
        <p className="text-white font-bold text-lg px-2">Recent News</p>
        {data &&
          data?.slice(0, 4).map((news: any, index: number) => {
            return (
              <div
                key={index}
                className="flex
                 gap-3 h-20 bg-[#2C353D] rounded-lg
                w-full p-3 mt-2"
              >
                <Image
                  src={news?.urlToImage || "/recent.png"}
                  width={55}
                  height={55}
                  alt="news"
                  className="rounded-lg object-cover"
                />
                <p className="h-[45px] text-gray-300 text-ellipsis overflow-hidden">
                  {news.title}
                </p>
              </div>
            );
          })}
      </div>

      <h1 className="font-medium text-lg tracking-wide px-2 mt-3 mb-2">
        Popular Tags
      </h1>
      <div
        className="h-min bg-[#262D34] rounded-xl text-gray-300 
      p-3 grid grid-cols-2 gap-2"
      >
        <div
          className={`flex items-center justify-start cursor-pointer p-1 gap-3`}
        >
          <Image src="/study.png" height={22} width={22} alt="image" />
          <p>#doubts</p>
        </div>

        <div
          className={`flex items-center justify-start cursor-pointer p-1 gap-3`}
        >
          <Image src="/code.png" height={22} width={22} alt="image" />
          <p>#javascript</p>
        </div>

        <div
          className={`flex items-center justify-start cursor-pointer p-1 gap-3`}
        >
          <Image src="/stock-market.png" height={22} width={22} alt="image" />
          <p>#finance</p>
        </div>

        <div
          className={`flex items-center justify-start cursor-pointer p-1 gap-3`}
        >
          <Image src="/cricket.png" height={22} width={22} alt="image" />
          <p>#sports</p>
        </div>
      </div>
    </div>
  );
};

export function CustomButton() {
  return (
    <>
      <Button
        className="bg-[#FF6934] text-white
      rounded-xl
      w-full h-12"
        // @ts-ignore
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        <BadgePlus height={22} width={22} />
        <p className="ml-2 font-bold text-base">Start new Topic</p>
      </Button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-[#1E212A] flex flex-col items-center">
          <form method="dialog" className="ml-1/2">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <Form />
        </div>
      </dialog>
    </>
  );
}

export default RightsideBar;
