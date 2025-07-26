import {
  LucideBook,
  LucideCircleUser,
  LucideFolderOpen,
  LucideLibrary,
} from "lucide-react";

import { NavItem } from "./types";

import { accProfilePath, home, organizationsPath, tickets } from "@/paths";

export const navItems: NavItem[] = [
  {
    title: "All Tickets",
    icon: <LucideLibrary />,
    href: home(),
  },
  {
    title: "My Tickets",
    icon: <LucideBook />,
    href: tickets(),
  },
  {
    title: "Account",
    icon: <LucideCircleUser />,
    href: accProfilePath(),
    separator: true,
  },
  {
    title: "Organizations",
    icon: <LucideFolderOpen />,
    href: organizationsPath(),
  },
];

export const closedClassName =
  "text-background opacity-0 transition-all duration-300 group-hover:z-40 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100";
