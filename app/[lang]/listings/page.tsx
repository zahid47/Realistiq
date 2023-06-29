import getQueryClient from "@/lib/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import HydrateWrapper from "@/components/providers/Hydrate";
import Listings from "@/components/listings/Listings";
import { listingsSearchParamsSchema } from "@/schema/listings";
import { getListings } from "@/actions/listing";

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function ListingsPage({ searchParams }: Props) {
  const parsedSearchParams = listingsSearchParamsSchema.parse(searchParams);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["listings", parsedSearchParams.page],
    queryFn: () => getListings({ page: parsedSearchParams.page }),
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
