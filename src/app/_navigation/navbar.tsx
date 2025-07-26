"use client";

import Link from "next/link";

import { LucideZap } from "lucide-react";

import DarkTheme from "../../components/dark-theme";
import { Button, buttonVariants } from "../../components/ui/button";

import AccountDropdown from "./account-dropdown";

import useAuth from "@/features/auth/hooks/useAuth";
import { cn } from "@/lib/utils";
import { home, signInPath, signUpPath } from "@/paths";

const Navbar = () => {
  const { user, isFetched } = useAuth();

  if (!isFetched) return null;

  const signUpButton = (
    <Link
      href={signUpPath()}
      className={cn(buttonVariants({ variant: "outline" }), "dark:text-white")}
    >
      Sign Up
    </Link>
  );

  const signInButton = (
    <Link
      href={signInPath()}
      className={cn(buttonVariants({ variant: "default" }), "dark:text-white")}
    >
      Sign In
    </Link>
  );

  return (
    <header>
      {isFetched ? (
        <nav className="animate-navbar bg-background/95 fixed top-0 right-0 left-0 z-50 flex flex-wrap items-center justify-between border-b border-b-zinc-200 px-4 py-2 backdrop-blur md:px-8 md:py-4 dark:border-b-zinc-800">
          <Button variant="outline" asChild>
            <Link href={home()} className="flex gap-x-2">
              <LucideZap color="blue" className="size-5" />

              <h1 className="text-xl">Ticketwise</h1>
            </Link>
          </Button>

          <div className="flex items-center gap-x-2">
            <DarkTheme />

            {user ? (
              <AccountDropdown user={user} />
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
