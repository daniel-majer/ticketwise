import React from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { Toaster } from "sonner";

import "./globals.css";

import Navbar from "@/components/navbar";

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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <header>
            <Navbar />
          </header>
          <main className="flex flex-1 flex-col justify-start px-4 pt-18 pb-2 md:px-8 md:pt-24 md:pb-4">
            {children}
          </main>
        </ThemeProvider>
        <Toaster expand />
      </body>
    </html>
  );
}
