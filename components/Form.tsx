import { use, useEffect, useState } from "react";
import { activeColor } from "./constants";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "react-query";

function Form() {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [postTitle, setpostTitle] = useState("");
  const [postDescription, setpostDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [currTag, setCurrTag] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/user/${user?.id}`)
        .then((res) => setUserId(res.data.data?._id));
    }
  }, [user]);

  const mutation = useMutation({
    mutationKey: ["addQuestion"],
    mutationFn: (question: Object) => axios.post(`/api/posts`, question),
    onSuccess: () => {
      queryClient.invalidateQueries("getAllQuestions");
    },
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const question = {
      question: postTitle,
      description: postDescription,
      tags: tags,
      userId,
    };

    let label_0;
    let label_1;

    const response = await query(postTitle);
    console.log("response", response[0]);
    label_0 = response[0][0].label;
    label_1 = response[0][0].label;

    if (label_0 === "LABEL_0") {
      toast.error("Your question seems to be a spam", {
        duration: 2000,
        dismissible: true,
      });
      return;
    }

    const res = await mutation.mutateAsync(question);
    console.log("res", res);
    if (res.status === 201) {
      toast.success("Question added successfully", {
        duration: 2000,
        dismissible: true,
      });
      setpostTitle("");
      setpostDescription("");
      setTags([]);
      setCurrTag("");
      document.getElementById("my_modal_3").open = false;
    }
  };

  async function query(data: string) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/shahrukhx01/bert-mini-finetune-question-detection",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();

    return result;
  }

  return (
    <>
      <div
        className="w-full flex flex-col
        items-start justify-center"
      >
        <label
          htmlFor="postTitle"
          className="text-[#FF6934] font-semibold mb-1"
        >
          Post Title
        </label>
        <input
          type="text"
          placeholder="Enter post title here..."
          id="postTitle"
          value={postTitle}
          onChange={(e) => setpostTitle(e.target.value)}
          className={`flex w-full bg-[${activeColor}] h-12 items-center justify-between px-4 
            py-4 
            rounded-md outline-none border-transparent focus:border-transparent focus-within:ring-1 focus-within:ring-[#FF6934] focus:border-[#FF6934] mb-2`}
        />
        <label
          htmlFor="postTitle"
          className="text-[#FF6934] font-semibold mb-1"
        >
          Post Description
        </label>
        <textarea
          rows={2}
          id="postDescription"
          placeholder="Enter post description here..."
          value={postDescription}
          onChange={(e) => setpostDescription(e.target.value)}
          className={`flex w-full bg-[${activeColor}] items-center justify-between px-4 
            py-4 rounded-md outline-none border-transparent focus:border-transparent focus-within:ring-1 focus-within:ring-[#FF6934] focus:border-[#FF6934] mb-2`}
        />
        <label
          htmlFor="postTitle"
          className="text-[#FF6934] font-semibold mb-1"
        >
          Related Tags
        </label>
        <input
          type="text"
          id="tags"
          placeholder="press enter to add tags"
          value={currTag}
          onChange={(e) => {
            setCurrTag(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setTags([...tags, currTag]);
              setCurrTag("");
              e.target.value = "";
            }
          }}
          className={`flex w-full bg-[${activeColor}] h-10 items-center justify-between px-4 
            py-2
            rounded-md outline-none border-transparent focus:border-transparent focus-within:ring-1 focus-within:ring-[#FF6934] focus:border-[#FF6934] mb-2`}
        />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <div
              onClick={() => {
                setTags(tags.filter((t) => t !== tag));
              }}
              key={i}
              className="bg-[#FF6934] text-sm flex items-center gap-2 cursor-pointer text-slate-200 rounded-full px-2 py-1"
            >
              <p>#{tag}</p>
              <X height={12} width={12} />
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        className="bg-[#FF6934] text-white
      rounded-xl
      w-full h-10 mt-4"
      >
        <p className="ml-2 font-bold text-base">Start new Discussion</p>
      </Button>
    </>
  );
}

export default Form;
