import React, { cloneElement } from "react";
import Link from "next/link";

import { closedClassName } from "../constants";
import { NavItem } from "../types";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type SidebarProps = {
  isOpen: boolean;
  navItem: NavItem;
  isActive: boolean;
};

const SidebarItem = ({ isOpen, navItem, isActive }: SidebarProps) => {
  return (
    <>
      {navItem.separator && <Separator />}
      <Link
        href={navItem.href}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "group relative flex h-12 justify-start",
          !isOpen && "justify-center",
          isActive && "bg-muted hover:bg-muted font-bold",
        )}
      >
        {cloneElement(navItem.icon, {
          className: "h-5 w-5",
        })}
        <span
          className={cn(
            "absolute left-12 text-base duration-200",
            isOpen ? "hidden md:block" : "w-[78px]",
            !isOpen && closedClassName,
          )}
        >
          {navItem.title}
        </span>
      </Link>
    </>
  );
};

export default SidebarItem;
