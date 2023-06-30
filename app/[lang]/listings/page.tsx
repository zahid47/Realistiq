import { getListingsFromDB } from "@/actions/db-calls/listing";
import Listings from "@/components/listings/Listings";
import HydrateWrapper from "@/components/providers/Hydrate";
import getQueryClient from "@/lib/getQueryClient";
import { getListingsPayload } from "@/lib/validators/listing";
import { dehydrate } from "@tanstack/react-query";

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function ListingsPage({ searchParams }: Props) {
  const parsedSearchParams = getListingsPayload.parse(searchParams);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["listings", parsedSearchParams],
    queryFn: () => getListingsFromDB(parsedSearchParams),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateWrapper state={dehydratedState}>
      <Listings searchParams={parsedSearchParams} />
    </HydrateWrapper>
  );
}
