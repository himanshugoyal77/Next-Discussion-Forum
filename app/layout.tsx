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

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const queryClient = new QueryClient();

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
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <header>
                <Header />
              </header>
              <main
                className="h-screen w-full flex items-center justify-center
            
            "
              >
                <Toaster />
                <SidebarMobile />
                <div className="flex md:px-20 w-full">
                  <div className="hidden md:block left_sidebar relative h-screen basis-64">
                    <SidebarPc />
                  </div>
                  <div className="main_content flex-grow">
                    <div className="h-screen w-full  pt-12">
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
                    <div className="h-screen ">Right Sidebar</div>
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
