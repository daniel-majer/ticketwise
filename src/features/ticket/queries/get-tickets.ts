import { Ticket } from "../types";

import { initialState } from "@/data";

export const getTickets = async (): Promise<Ticket[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulating a fetch request to get tickets
  return new Promise((resolve) => {
    resolve(initialState);
  });
};
