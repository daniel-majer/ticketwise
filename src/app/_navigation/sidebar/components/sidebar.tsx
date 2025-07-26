"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import { navItems } from "../constants";

import SidebarItem from "./sidebar-item";

import { cn } from "@/lib/utils";
import { signInPath, signUpPath } from "@/paths";
import { getActivePath } from "@/utils/get-active-path";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransition, setIsTransition] = useState(false);
  // const { user, isFetched } = useAuth();
  const pathName = usePathname();

  const { activeIndex } = getActivePath(
    pathName,
    navItems.map((item) => item.href),
    [signInPath(), signUpPath()],
  );

  const handleToggle = (open: boolean) => {
    setIsTransition(true);
    setIsOpen(open);
    setTimeout(() => setIsTransition(false), 200);
  };
  // if (!user || !isFetched) return <div className="w-[78px]" />;

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
          {navItems.map((navItem, index) => {
            return (
              <SidebarItem
                key={navItem.title}
                isOpen={isOpen}
                navItem={navItem}
                isActive={activeIndex === index}
              />
            );
          })}
        </nav>
      </div>
    </nav>
  );
};

export default Sidebar;
