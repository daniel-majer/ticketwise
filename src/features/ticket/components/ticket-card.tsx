"use client";

import Link from "next/link";
import { notFound } from "next/navigation";

import clsx from "clsx";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
} from "lucide-react";

import { TICKET_ICONS } from "../constants";
import { TicketWithMeta } from "../types";

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
import { ticketById, ticketEdit } from "@/paths";
import { toCurrencyFromCent } from "@/utils/currency";

type TicketCardProps = {
  ticket: TicketWithMeta;
  isDetail?: boolean;
  comments?: React.ReactNode;
};

export const TicketCard = ({
  ticket,
  isDetail = false,
  comments = [],
}: TicketCardProps) => {
  if (!ticket) notFound();

  const { id, title, content, status } = ticket;

  const detailButton = (
    <div className="flex flex-col justify-between">
      <Button
        size="icon"
        variant="outline"
        className="cursor-pointer rounded-sm"
        asChild
      >
        <Link prefetch href={ticketById(id)}>
          <LucideSquareArrowOutUpRight />
        </Link>
      </Button>
    </div>
  );

  const editButton = ticket.isTicketOwner ? (
    <div className="flex flex-col justify-between">
      <Button
        size="icon"
        variant="outline"
        className="cursor-pointer rounded-sm"
        asChild
      >
        <Link prefetch href={ticketEdit(id)}>
          <LucidePencil />
        </Link>
      </Button>
    </div>
  ) : null;

  const moreButton = ticket.isTicketOwner ? (
    <TicketDropdownMenu
      ticket={ticket}
      trigger={
        <Button variant="outline" size="icon" className="cursor-pointer">
          <LucideMoreVertical />
        </Button>
      }
    />
  ) : null;

  return (
    <div
      className={clsx("mx-auto flex w-full flex-col gap-y-4", {
        "max-w-[480px]": !isDetail,
        "max-w-[520px]": isDetail,
      })}
    >
      <div className="flex gap-x-2">
        <Card className="flex-1 rounded-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 truncate text-2xl">
              {TICKET_ICONS[status]} {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="line-clamp-3 text-base whitespace-break-spaces text-white">
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
      {/* {isDetail ? (
        <CommentList ticketId={ticket.id} comments={comments} />
      ) : null} */}
      {comments}
    </div>
  );
};
