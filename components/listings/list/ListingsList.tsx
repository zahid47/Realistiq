"use client";

import { Dispatch, SetStateAction } from "react";
import ListingCard from "./ListingCard";
import ListingsListSkeleton from "../../skeletons/ListingsListSkeleton";
import { UseQueryResult } from "@tanstack/react-query";

interface Props {
  listingsQueryResult: UseQueryResult<any, unknown>;
  clickedListingId: null | number;
  setHoveringListingId: Dispatch<SetStateAction<null | number>>;
}

export default function ListingsList({
  listingsQueryResult,
  clickedListingId,
  setHoveringListingId,
}: Props) {
  if (listingsQueryResult.isLoading) return <ListingsListSkeleton />;

  return (
    <ul>
      {listingsQueryResult.data?.map((listing: any) => {
        return (
          <li key={listing.id} className="mb-2 ml-2 mr-2">
            <ListingCard
              key={listing.id}
              listing={listing}
              clickedListingId={clickedListingId}
              setHoveringListingId={setHoveringListingId}
            />
          </li>
        );
      })}
    </ul>
  );
}
