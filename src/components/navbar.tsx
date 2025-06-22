import React from "react";
import Link from "next/link";

import { LucideZap } from "lucide-react";

import { Button } from "./ui/button";
import DarkTheme from "./dark-theme";

import { home, signInPath, signUpPath, tickets } from "@/paths";

const Navbar = () => {
  const ticketsButton = (
    <Button className="dark:text-white" asChild variant="outline">
      <Link href={tickets()}>Tickets</Link>
    </Button>
  );
  const signUpButton = (
    <Button className="dark:text-white" asChild variant="outline">
      <Link href={signUpPath()}>Sign Up</Link>
    </Button>
  );
  const signInButton = (
    <Button className="dark:text-white" asChild>
      <Link href={signInPath()}>Sign In</Link>
    </Button>
  );
  return (
    <nav className="bg-background/95 fixed top-0 right-0 left-0 flex flex-wrap items-center justify-between border-b border-b-zinc-200 px-4 py-2 backdrop-blur md:px-8 md:py-4 dark:border-b-zinc-800">
      <Button variant="outline" asChild>
        <Link href={home()} className="flex gap-x-2">
          <LucideZap color="blue" className="size-5" />
          <h1 className="text-xl">Ticketwise</h1>
        </Link>
      </Button>
      <div className="flex items-center gap-x-2">
        <DarkTheme />
        {ticketsButton}
        {signUpButton}
        {signInButton}
      </div>
    </nav>
  );
};

export default Navbar;
