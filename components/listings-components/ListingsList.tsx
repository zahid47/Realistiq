"use client";

import { Dispatch, SetStateAction } from "react";
import ListingCard from "./ListingCard";

interface Props {
  listings: any;
  clickedListingId: null | number;
  setHoveringListingId: Dispatch<SetStateAction<null | number>>;
}

export default function ListingsList({
  listings,
  clickedListingId,
  setHoveringListingId,
}: Props) {
  return (
    <ul>
      {listings?.map((listing: any) => {
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
