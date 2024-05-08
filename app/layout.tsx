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
              `min-h-screen bg-[${bgPrimary}] font-sans antialiased`,
              fontSans.variable
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <header className="w-full flex items-center bg-[#262D34] justify-center fixed top-0">
                <Header />
              </header>
              <QueryClientProvider client={queryClient} contextSharing={true}>
                <main
                  className="h-screen xl:mt-20 mt-[60px] xl:w-[80%] md:w-[95%] sm:w-full mx-auto flex items-center justify-center
            "
                >
                  <Toaster />
                  <SidebarMobile />
                  <div className="flex w-full">
                    <div
                      className="left_sidebar p-1 pr-5 hidden w-[17%] md:w-[24%] md:block
                   
                    "
                    >
                      <div className="h-screen w-full">
                        <Topbar />
                        <MiddleBar />
                        <SidebarBottom />
                      </div>
                    </div>

                    <div className="w-[55%] mt-2 main_content">
                      <div className="h-screen w-full flex flex-col items-center justify-start">
                        <SignedIn>{children}</SignedIn>
                        <SignedOut>
                          <div className="h-full w-full flex flex-col gap-4 items-center justify-center">
                            <h1>Sign In to Continue...</h1>
                            <PageWithSignIn />
                          </div>
                        </SignedOut>
                      </div>
                    </div>
                    <div className="right_sidebar w-[30%]">
                      {/* <div className="w-[30%]"></div> */}
                      <div className="h-screen w-full">
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
