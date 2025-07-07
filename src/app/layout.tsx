import React from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "sonner";

import ReactQueryProvider from "./_providers/providers";

import "./globals.css";

import Navbar from "@/app/_navigation/navbar";
import Sidebar from "@/app/_navigation/sidebar/components/sidebar";
import RedirectToast from "@/components/redirect-toast";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ticketwise app",
  description:
    "TicketWise is a smart ticket management app that helps you organize, track, and access all your tickets in one place — hassle-free and secure.",
  category: "SaaS",
  creator: "by Daniel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} flex h-full min-h-screen flex-col antialiased`}
      >
        <NuqsAdapter>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ReactQueryProvider>
              <Navbar />
              <div className="flex h-screen border-collapse overflow-x-hidden">
                <Sidebar />

                <main className="flex min-h-screen flex-1 flex-col overflow-x-hidden overflow-y-auto px-4 pt-18 pb-2 md:px-8 md:pt-24 md:pb-4">
                  {children}
                </main>
              </div>
              <Toaster expand />
            </ReactQueryProvider>
          </ThemeProvider>
        </NuqsAdapter>
        <RedirectToast />
      </body>
    </html>
  );
}
