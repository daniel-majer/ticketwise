import { getTicket } from "@/features/ticket/queries/get-ticket";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ ticketId: string }> },
) => {
  const ticketParams = await params;
  const ticket = await getTicket(await ticketParams.ticketId);

  return Response.json(ticket);
};
