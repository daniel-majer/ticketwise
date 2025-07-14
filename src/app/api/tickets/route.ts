import { getTickets } from "@/features/ticket/queries/get-tickets";
import { searchParamsCache } from "@/features/ticket/search-params";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);

  const untypedSearchParams = Object.fromEntries(searchParams);

  const typedSearchParams = searchParamsCache.parse(untypedSearchParams);

  const { list, metaData } = await getTickets(undefined, typedSearchParams);
  // const { list, metaData } = await getTickets(undefined, {
  //   search: "",
  //   size: 5,
  //   page: 0,
  //   sortKey: "createdAt",
  //   sortValue: "desc",
  // })

  return Response.json({ list, metaData });
};
