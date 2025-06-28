"use client";
import React, { useState } from "react";

import { navItems } from "../constants";

import SidebarItem from "./sidebar-item";

import useAuth from "@/features/auth/hooks/useAuth";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransition, setIsTransition] = useState(false);
  const { user, isFetched } = useAuth();

  const handleToggle = (open: boolean) => {
    setIsTransition(true);
    setIsOpen(open);
    setTimeout(() => setIsTransition(false), 200);
  };
  if (!user || !isFetched) return <div className="bg-secondary/20 w-[78px]" />;

  return (
    <nav
      className={cn(
        "animate-sidebar h-screen border-r pt-24",
        isTransition && "duration-200",
        isOpen ? "w-[78px] md:w-60" : "w-[78px]",
      )}
      onMouseEnter={() => handleToggle(true)}
      onMouseLeave={() => handleToggle(false)}
    >
      <div className="px-3 py-2">
        <nav className="space-y-2">
          {navItems.map((navItem) => {
            return (
              <SidebarItem
                key={navItem.title}
                isOpen={isOpen}
                navItem={navItem}
              />
            );
          })}
        </nav>
      </div>
    </nav>
  );
};

export default Sidebar;
