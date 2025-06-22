import Link from "next/link";
import { notFound } from "next/navigation";

import clsx from "clsx";
import {
  LucideMoreVertical,
  LucidePencil,
  LucideSquareArrowOutUpRight,
  LucideTrash2,
} from "lucide-react";

import { deleteTicket } from "../actions/delete-ticket";
import { TICKET_ICONS } from "../constants";
import { getTicket } from "../queries/get-ticket";
import { getTickets } from "../queries/get-tickets";

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
  ticket:
    | Awaited<ReturnType<typeof getTickets>>[number]
    | Awaited<ReturnType<typeof getTicket>>;
  isDetail?: boolean;
};

export const TicketCard = ({ ticket, isDetail = false }: TicketCardProps) => {
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
  const deleteButton = (
    <form
      action={deleteTicket.bind(null, id)}
      className="flex flex-col justify-between"
    >
      <Button
        size={"icon"}
        variant={"outline"}
        className="cursor-pointer rounded-sm"
      >
        <LucideTrash2 />
      </Button>
    </form>
  );
  const editButton = (
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
  );

  const moreButton = (
    <TicketDropdownMenu
      value={status}
      id={id}
      trigger={
        <Button variant="outline" size="icon" className="cursor-pointer">
          <LucideMoreVertical />
        </Button>
      }
    />
  );

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
          <p className="text-muted-foreground text-xs">{ticket.deadline}</p>
          <p className="text-muted-foreground text-xs">
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-1">
        {isDetail ? (
          <>
            {deleteButton}
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
