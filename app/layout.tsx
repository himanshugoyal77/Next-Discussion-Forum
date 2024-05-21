"use strict";
"use client";

import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import {
  ClerkProvider,
  SignInButton,
  SignIn,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import Header from "@/components/Header";
import { Provider } from "react-redux";
import { store } from "@/lib/context/store";
import Sidebar from "@/components/sidebar/left/Bottom";
import SidebarMobile from "@/components/sidebar/SidebarMobile";
import SidebarPc from "@/components/sidebar/left/Bottom";
import { Toaster } from "sonner";
import PageWithSignIn from "./sign-in/[[...sign-in]]/page";
import { QueryClient, QueryClientProvider } from "react-query";
import { bgPrimary } from "@/components/constants";
import { Home } from "lucide-react";
import Topbar from "@/components/sidebar/left/Top";
import MiddleBar from "@/components/sidebar/left/Middle";
import SidebarBottom from "@/components/sidebar/left/Bottom";
import RightsideBar from "@/components/sidebar/right/RightsideBar";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const queryClient = new QueryClient({
  defaultOptions: {},
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en" suppressHydrationWarning>
        <Provider store={store}>
          <body
            className={cn(
              `min-h-screen bg-[#0C0A09] font-sans antialiased`,
              fontSans.variable
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
            >
              <header className="w-full flex items-center bg-[#262D34] justify-center fixed top-0 z-[999]">
                <Header />
              </header>
              <QueryClientProvider client={queryClient} contextSharing={true}>
                <main
                  className="h-full
                  bg-[#0C0A09]
                  pt-[44px] md:pt-[65px] xl:w-[80%] md:w-[95%] sm:w-full mx-auto flex items-center justify-center
            "
                >
                  <Toaster />
                  <SidebarMobile />
                  <div className="flex w-full">
                    <div
                      className="left_sidebar p-1 pr-5 hidden w-[17%] md:w-[24%] md:block           
                    "
                    >
                      <div className="h-full w-full">
                        <Topbar />
                        <MiddleBar />
                        <SidebarBottom />
                      </div>
                    </div>

                    <div className="md:w-[55%] mt-2 main_content">
                      <div className="h-full w-full flex flex-col items-center justify-start px-4 pt-5 md:px-0 md:pt-0">
                        <SignedIn>{children}</SignedIn>
                        <SignedOut>
                          <div className="h-full w-full flex flex-col gap-4 items-center justify-start">
                            <h1>Sign In to Continue...</h1>
                            <PageWithSignIn />
                          </div>
                        </SignedOut>
                      </div>
                    </div>

                    <div className="right_sidebar w-[30%] hidden md:block">
                      {/* <div className="w-[30%]"></div> */}
                      <div className="h-full w-full">
                        <RightsideBar />
                      </div>
                    </div>
                  </div>
                </main>
              </QueryClientProvider>
            </ThemeProvider>
          </body>
        </Provider>
      </html>
    </ClerkProvider>
  );
}
