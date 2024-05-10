import { useState } from "react";
import { activeColor } from "./constants";
import { X } from "lucide-react";
import { Button } from "./ui/button";

function Form() {
  const [postTitle, setpostTitle] = useState("");
  const [postDescription, setpostDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [currTag, setCurrTag] = useState("");

  console.log(tags);

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
