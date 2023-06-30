"use client";

import { Dispatch, SetStateAction } from "react";
import ListingCard from "./ListingCard";
import ListingsListSkeleton from "../../skeletons/ListingsListSkeleton";
import { QueryObserverSuccessResult } from "@tanstack/react-query";
import { ExtendedListing } from "@/types/db";
import { ReturnData } from "@/actions/api-calls/listing";

interface Props {
  listingsQueryResult: QueryObserverSuccessResult<ReturnData, unknown>;
  clickedListingId: null | number;
  setHoveringListingId: Dispatch<SetStateAction<null | number>>;
  setPopup: Dispatch<SetStateAction<null | ExtendedListing>>;
}

export default function ListingsList({
  listingsQueryResult,
  clickedListingId,
  setHoveringListingId,
  setPopup,
}: Props) {
  const listings = listingsQueryResult.data.listings;

  if (listingsQueryResult.isLoading) return <ListingsListSkeleton />;

  if (!listings?.length) return <p>No listings found</p>;

  return (
    <ul>
      {listings.map((listing: ExtendedListing) => {
        return (
          <li key={listing.id} className="mb-2 ml-2 mr-2">
            <ListingCard
              key={listing.id}
              listing={listing}
              clickedListingId={clickedListingId}
              setHoveringListingId={setHoveringListingId}
              setPopup={setPopup}
            />
          </li>
        );
      })}
    </ul>
  );
}
