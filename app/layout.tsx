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
import Sidebar from "@/components/sidebar/SidebarPc";
import SidebarMobile from "@/components/sidebar/SidebarMobile";
import SidebarPc from "@/components/sidebar/SidebarPc";
import { Toaster } from "sonner";
import PageWithSignIn from "./sign-in/[[...sign-in]]/page";
import { QueryClient, QueryClientProvider } from "react-query";
import { bgPrimary } from "@/components/constants";
import RightsideBar from "@/components/sidebar/RightsideBar";

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
              <main
                className="h-screen w-[80%] mx-auto flex items-center justify-center
            "
              >
                <Toaster />
                <SidebarMobile />
                <div className="flex w-full">
                  <div className="hidden md:block left_sidebar relative h-screen basis-64">
                    <SidebarPc />
                  </div>
                  <div className="w-full main_content flex-grow">
                    <div className="h-screen w-full flex py-16 flex-col items-center justify-start">
                      <SignedIn>
                        <QueryClientProvider
                          client={queryClient}
                          contextSharing={true}
                        >
                          {children}
                        </QueryClientProvider>
                      </SignedIn>
                      <SignedOut>
                        <div className="h-full w-full flex flex-col gap-4 items-center justify-center">
                          <h1>Sign In to Continue...</h1>
                          <PageWithSignIn />
                        </div>
                      </SignedOut>
                    </div>
                  </div>
                  <div className="right_sidebar basis-64 ">
                    <div className="h-screen fixed top-20">
                      <RightsideBar />
                    </div>
                  </div>
                </div>
              </main>
            </ThemeProvider>
          </body>
        </Provider>
      </html>
    </ClerkProvider>
  );
}
