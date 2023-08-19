import { getListingsFromDB } from "@/actions/db-calls/listing";
import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import {
  GetListingsPayload,
  getListingsPayload,
} from "@/lib/validators/listing";
import HydrateWrapper from "@/components/shared/Hydrate";
import Listings from "./_components/Listings";

interface Props {
  searchParams: Partial<GetListingsPayload>;
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
