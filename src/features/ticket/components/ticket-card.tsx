import React from "react";
import Link from "next/link";

import clsx from "clsx";
import {
  LucideCircleCheckBig,
  LucideFolderOpen,
  LucideLoaderCircle,
  LucideSquareArrowOutUpRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ticketById } from "@/paths";

type Ticket = {
  id: string;
  title: string;
  content: string;
  status: "DONE" | "OPEN" | "IN_PROGRESS";
};

type TicketCardProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

const titleIcons = {
  DONE: <LucideCircleCheckBig />,
  OPEN: <LucideFolderOpen />,
  IN_PROGRESS: <LucideLoaderCircle />,
};

export const TicketCard = ({ ticket, isDetail = false }: TicketCardProps) => {
  const { id, title, content, status } = ticket;

  return (
    <div
      className={clsx("mx-auto flex gap-x-4", {
        "max-w-[480px]": !isDetail,
        "max-w-[520px]": isDetail,
      })}
    >
      <Card className="flex-1 rounded-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 truncate text-2xl">
            {titleIcons[status]} {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3 whitespace-break-spaces">
            {content}
          </CardDescription>
        </CardContent>
      </Card>
      {isDetail ? null : (
        <div className="flex flex-col justify-between">
          <Button
            size={"icon"}
            variant={"outline"}
            className="cursor-pointer rounded-sm"
            asChild
          >
            <Link href={ticketById(id)}>
              <LucideSquareArrowOutUpRight />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};
