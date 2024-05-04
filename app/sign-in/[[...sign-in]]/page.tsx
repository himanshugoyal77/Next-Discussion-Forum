"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

const PageWithSignIn = () => {
  const { resolvedTheme } = useTheme();

  return (
    <SignIn
      appearance={{
        baseTheme: resolvedTheme === "dark" ? dark : undefined,
      }}
    />
  );
};

export default PageWithSignIn;
