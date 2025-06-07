import React from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

import { LucideZap } from "lucide-react";

import "./globals.css";

import { Button } from "@/components/ui/button";
import { home, tickets } from "@/paths";

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
    <html lang="en">
      <body
        className={`${inter.className} flex h-full min-h-screen flex-col antialiased`}
      >
        <header className="border-b border-b-zinc-200">
          <nav className="flex flex-wrap items-center justify-between px-4 py-2 md:px-8 md:py-4">
            <Button variant={"outline"} asChild>
              <Link href={home()} className="flex gap-x-2">
                <LucideZap color="blue" className="size-5" />
                <h1 className="text-xl">Ticketwise</h1>
              </Link>
            </Button>
            <Button asChild>
              <Link href={tickets()}>Tickets</Link>
            </Button>
          </nav>
        </header>
        <main className="flex-1 px-4 py-2 md:px-8 md:py-4">{children}</main>
      </body>
    </html>
  );
}
