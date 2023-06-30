"use client";

import { useQuery } from "@tanstack/react-query";
import { getListing } from "@/actions/api-calls/listing";
import ListingDetailsSkeleton from "@/components/skeletons/ListingDetailsSkeleton";

interface Props {
  slug: string;
}

export default function ListingDetails({ slug }: Props) {
  const listingDetailsQueryResult = useQuery({
    queryKey: ["listing", slug],
    queryFn: () => getListing(slug),
  });

  if (listingDetailsQueryResult.isLoading) {
    return <ListingDetailsSkeleton />;
  }

  const listing = listingDetailsQueryResult.data;

  return <pre>{JSON.stringify(listing, null, 2)}</pre>;
}
