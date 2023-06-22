"use client";

import { useQuery } from "@tanstack/react-query";
import { getListing } from "@/actions/listing";

interface Props {
  slug: string;
}

export default function ListingDetails({ slug }: Props) {
  const listingDetailsQueryResult = useQuery({
    queryKey: ["listing", slug],
    queryFn: () => getListing(slug),
  });

  return <pre>{JSON.stringify(listingDetailsQueryResult)}</pre>;
}
