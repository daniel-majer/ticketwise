import React, { Fragment } from "react";
import Link from "next/link";

import { LucideChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Crumbs = {
  title: string;
  href?: string;
  dropdown?: {
    title: string;
    href: string;
  }[];
};

type CrumbsProps = {
  breadcrumbs: Crumbs[];
};

const Breadcrumbs = ({ breadcrumbs }: CrumbsProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, i) => {
          let breadcrumbItem = (
            <BreadcrumbLink href={crumb.href}>{crumb.title}</BreadcrumbLink>
          );

          if (!crumb.href)
            breadcrumbItem = <BreadcrumbPage>{crumb.title}</BreadcrumbPage>;

          if (crumb.dropdown) {
            breadcrumbItem = (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  {crumb.title}
                  <LucideChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {crumb.dropdown.map((item) => {
                    return (
                      <DropdownMenuItem asChild key={item.title}>
                        <Link href={item.href}>{item.title}</Link>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }
          return (
            <Fragment key={crumb.title}>
              <BreadcrumbItem>{breadcrumbItem}</BreadcrumbItem>
              {i !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
