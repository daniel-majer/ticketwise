import Link from "next/link";
import { notFound } from "next/navigation";

import { Prisma } from "@prisma/client";
import clsx from "clsx";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";

import { TICKET_ICONS } from "../constants";

import { TicketDropdownMenu } from "./ticket-more-menu";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuth } from "@/features/auth/queries/cookie";
import { isOwner } from "@/features/auth/utils/isOwner";
import { ticketById, ticketEdit } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";

type TicketCardProps = {
  ticket: Prisma.TicketGetPayload<{
    include: {
      User: {
        select: {
          username: true;
        };
      };
    };
  }>;
  isDetail?: boolean;
};

export const TicketCard = async ({
  ticket,
  isDetail = false,
}: TicketCardProps) => {
  const { user } = await getAuth();
  const isTicketOwner = isOwner(user, ticket);

  if (!ticket) notFound();

  const { id, title, content, status } = ticket;

  const detailButton = (
    <div className="flex flex-col justify-between">
      <Button
        size={"icon"}
        variant={"outline"}
        className="cursor-pointer rounded-sm"
        asChild
      >
        <Link prefetch href={ticketById(id)}>
          <LucideSquareArrowOutUpRight />
        </Link>
      </Button>
    </div>
  );

  const editButton = isTicketOwner ? (
    <div className="flex flex-col justify-between">
      <Button
        size={"icon"}
        variant={"outline"}
        className="cursor-pointer rounded-sm"
        asChild
      >
        <Link prefetch href={ticketEdit(id)}>
          <LucidePencil />
        </Link>
      </Button>
    </div>
  ) : null;

  const moreButton = isTicketOwner ? (
    <TicketDropdownMenu
      value={status}
      id={id}
      trigger={
        <Button variant="outline" size="icon" className="cursor-pointer">
          <LucideMoreVertical />
        </Button>
      }
    />
  ) : null;

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
            {TICKET_ICONS[status]} {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3 whitespace-break-spaces">
            {content}
          </CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-muted-foreground text-xs">
            {ticket.deadline} by {ticket.User?.username}
          </p>
          <p className="text-muted-foreground text-xs">
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-1">
        {isDetail ? (
          <>
            {editButton}
            {moreButton}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
};
