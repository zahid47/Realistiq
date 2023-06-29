import getQueryClient from "@/lib/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import HydrateWrapper from "@/components/providers/Hydrate";
import Listings from "@/components/listings/Listings";
import { listingsSearchParamsSchema } from "@/schema/listings";
import { env } from "@/env.mjs";
import { z } from "zod";
import { headers } from "next/headers";

interface Props {
  searchParams: {
    page: string;
  };
}

export async function getListingsServer(
  data: z.input<typeof listingsSearchParamsSchema>
) {
  const { page } = listingsSearchParamsSchema.parse(data);
  const query = new URLSearchParams({ page: page.toString() });
  const url = new URL(`${env.NEXT_PUBLIC_APP_URL}/api/listings?${query}`);
  const res = await fetch(url, { cache: "no-store", headers: headers() });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return await res.json();
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
