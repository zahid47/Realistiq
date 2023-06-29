import getQueryClient from "@/lib/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import HydrateWrapper from "@/components/providers/Hydrate";
import Listings from "@/components/listings/Listings";
import { listingsSearchParamsSchema } from "@/schema/listings";
import { z } from "zod";
import { getListingsFromDB } from "@/app/api/listings/route";

interface Props {
  searchParams: {
    page: string;
  };
}

export async function getListingsServer(
  data: z.input<typeof listingsSearchParamsSchema>
) {
  const payload = listingsSearchParamsSchema.parse(data);

  try {
    return await getListingsFromDB(payload);
  } catch {
    throw new Error();
  }
}

export default async function ListingsPage({ searchParams }: Props) {
  const parsedSearchParams = listingsSearchParamsSchema.parse(searchParams);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["listings", parsedSearchParams.page],
    queryFn: () => getListingsServer({ page: parsedSearchParams.page }),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrateWrapper state={dehydratedState}>
        <Listings searchParams={parsedSearchParams} />
      </HydrateWrapper>
    </>
  );
}
