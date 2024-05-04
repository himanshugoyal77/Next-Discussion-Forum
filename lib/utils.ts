import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import axios from "axios";

export const upload = async (data: any) => {
  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_ENV}/image/upload`,
      data,
      {
        withCredentials: false,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const { url } = res.data;
    localStorage.setItem("user_image", url);
    return url;
  } catch (err) {
    throw new Error("Failed to upload image");
  }
};
