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

  return (
    <div className="text-center">
      <p className="text-center text-sm text-slate-500">
        <i>[Work in progress]</i>
      </p>
      Property for rent in <b>{listing.location.address}.</b>
      <p>
        With a total area of <b>{listing.details.floor_area} SqFt</b>, this
        property has <b>{listing.details.beds} beds</b> and{" "}
        <b>{listing.details.baths} baths</b>. The price is{" "}
        <b>
          {listing.price.amount} {listing.price.currency}
        </b>{" "}
        per <b>{listing.price.interval.toLowerCase()}</b>.
      </p>
    </div>
  );
  // return <pre>{JSON.stringify(listing, null, 2)}</pre>;
}
