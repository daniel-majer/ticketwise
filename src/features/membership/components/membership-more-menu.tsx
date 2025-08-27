"use client";

import React from "react";

import { MembershipRole } from "@prisma/client";
import { LucideUserCog } from "lucide-react";
import { toast } from "sonner";

import { updateMembershipRole } from "../actions/update-membership-role";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type MembershipMoreMenuType = {
  userId: string;
  organizationId: string;
  membershipRole: string;
};

const MembershipMoreMenu = ({
  userId,
  organizationId,
  membershipRole,
}: MembershipMoreMenuType) => {
  const handleUpdateMembershipRole = async (role: string) => {
    const promise = updateMembershipRole({
      userId,
      organizationId,
      membershipRole: role as MembershipRole,
    });

    toast.promise(promise, {
      loading: "Updating membership role...",
    });

    const results = await promise;

    if (results.status === "SUCCESS") {
      toast.success(results.message);
    } else {
      toast.error(results.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <LucideUserCog size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Roles</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={membershipRole}
          onValueChange={handleUpdateMembershipRole}
        >
          <DropdownMenuRadioItem value="ADMIN">Admin</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="MEMBER">Member</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MembershipMoreMenu;
