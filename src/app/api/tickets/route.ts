import { getTickets } from "@/features/ticket/queries/get-tickets";

export const GET = async () => {
  const { list, metaData } = await getTickets(undefined, {
    search: "",
    size: 5,
    page: 0,
    sortKey: "createdAt",
    sortValue: "desc",
  });

  return Response.json({ list, metaData });
};
