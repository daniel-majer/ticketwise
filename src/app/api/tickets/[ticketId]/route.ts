import { getTicket } from "@/features/ticket/queries/get-ticket";

export const GET = async (
  _request: Request,
  { params }: { params: { ticketId: string } },
) => {
  const ticket = await getTicket(params.ticketId);

  return Response.json(ticket);
};
