import { Ticket } from "../types";

import { initialState } from "@/data";

export const getTicket = async (
  ticketId: string,
): Promise<Ticket | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const maybeTicket = initialState.find((ticket) => ticket.id === ticketId);

  return new Promise((resolve) => {
    resolve(maybeTicket);
  });
};
