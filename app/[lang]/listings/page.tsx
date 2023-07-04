import { getListingsFromDB } from "@/actions/db-calls/listing";
import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import { getListingsPayload } from "@/lib/validators/listing";
import Listings from "@/components/listings/Listings";
import HydrateWrapper from "@/components/providers/Hydrate";

interface Props {
  searchParams: {
    bounds?: string;
    //... there are more, but not using them here so no need to type them, we are validating it anyway so no worries hopefully
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
