"use client";

import Link from "next/link";

import { LucideLogOut, LucideZap } from "lucide-react";

import SubmitButton from "./form/submit-button";
import { Button } from "./ui/button";
import DarkTheme from "./dark-theme";

import { signOut } from "@/features/auth/actions/signout";
import useAuth from "@/features/auth/hooks/useAuth";
import { home, signInPath, signUpPath, tickets } from "@/paths";

const Navbar = () => {
  const { user, isFetched } = useAuth();

  if (!isFetched) return null;

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
  const logOutButton = (
    <form action={signOut}>
      <SubmitButton
        label="Sign Out"
        icon={<LucideLogOut className="h-4 w-4" />}
      />
    </form>
  );
  return (
    <header>
      {isFetched ? (
        <nav className="animate-navbar bg-background/95 fixed top-0 right-0 left-0 flex flex-wrap items-center justify-between border-b border-b-zinc-200 px-4 py-2 backdrop-blur md:px-8 md:py-4 dark:border-b-zinc-800">
          <Button variant="outline" asChild>
            <Link href={home()} className="flex gap-x-2">
              <LucideZap color="blue" className="size-5" />
              <h1 className="text-xl">Ticketwise</h1>
            </Link>
          </Button>
          <div className="flex items-center gap-x-2">
            <DarkTheme />
            {user ? (
              <>
                {ticketsButton}
                {logOutButton}
              </>
            ) : (
              <>
                {signUpButton}
                {signInButton}
              </>
            )}
          </div>
        </nav>
      ) : null}
    </header>
  );
};

export default Navbar;
