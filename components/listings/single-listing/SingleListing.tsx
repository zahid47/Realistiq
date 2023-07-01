"use client";

import { getListing } from "@/actions/api-calls/listing";
import { useQuery } from "@tanstack/react-query";
import ListingDetailsSkeleton from "@/components/skeletons/ListingDetailsSkeleton";

interface Props {
  uuid: string;
}

export default function SingleListing({ uuid }: Props) {
  const listingDetailsQueryResult = useQuery({
    queryKey: ["listing", uuid],
    queryFn: () => getListing(uuid),
  });

  if (listingDetailsQueryResult.isLoading) {
    return <ListingDetailsSkeleton />;
  }

  if (!listingDetailsQueryResult.isSuccess) return null;

  const listing = listingDetailsQueryResult.data;

  return <pre>{JSON.stringify(listing, null, 2)}</pre>;
}
