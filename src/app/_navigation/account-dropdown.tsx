import React from "react";
import Link from "next/link";

import { User } from "@prisma/client";
import { LucideLogOut, LucideUser } from "lucide-react";

import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";

import { signOut } from "@/features/auth/actions/signout";
import { accPasswordPath, accProfilePath } from "@/paths";

type AccDropdownProps = {
  user: User;
};

const AccountDropdown = ({ user }: AccDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={accProfilePath()} className="cursor-pointer">
            <LucideUser className="size-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={accPasswordPath()} className="cursor-pointer">
            <LucideUser className="size-4" />
            <span>Password</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action={signOut}>
            <button
              type="submit"
              className="flex cursor-pointer items-center gap-x-2"
            >
              <LucideLogOut className="size-4" />
              Sign Out{" "}
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountDropdown;
