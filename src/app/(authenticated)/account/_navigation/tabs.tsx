"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

import { accPasswordPath, accProfilePath } from "@/paths";

const AccountTabs = () => {
  const pathname = usePathname();
  const activeTab = pathname.split("/").at(-1);

  return (
    <Tabs value={activeTab}>
      <TabsList>
        <TabsTrigger
          className="rounded-md px-4 py-2 dark:data-[state=active]:bg-black!"
          value="profile"
          asChild
        >
          <Link className="" href={accProfilePath()}>
            Profile
          </Link>
        </TabsTrigger>
        <TabsTrigger
          className="rounded-md px-4 py-2 dark:data-[state=active]:bg-black!"
          value="password"
          asChild
        >
          <Link href={accPasswordPath()} className="">
            Password
          </Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default AccountTabs;
