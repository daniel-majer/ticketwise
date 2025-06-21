"use client";

import React from "react";
import { useTheme } from "next-themes";

import { LucideMoon, LucideSun } from "lucide-react";

import { Button } from "./ui/button";

const DarkTheme = () => {
  const { setTheme } = useTheme();

  return (
    <div>
      <Button
        className="cursor-pointer"
        size={"icon"}
        variant={"outline"}
        onClick={() =>
          setTheme((theme) => (theme === "light" ? "dark" : "light"))
        }
      >
        <LucideSun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <LucideMoon className="absolute h-4 w-4 scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0" />
      </Button>
    </div>
  );
};

export default DarkTheme;
