import React from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

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
      <body className={`${inter.className} antialiased`}>
        <main></main>
        {children}
      </body>
    </html>
  );
}
