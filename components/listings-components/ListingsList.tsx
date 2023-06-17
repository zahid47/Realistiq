"use client";

import { Dispatch, SetStateAction } from "react";
import ListingCard from "./ListingCard";

interface Props {
  listings: any;
  clickedListingId: null | number;
  setClickedListingId: Dispatch<SetStateAction<null | number>>;
  setHoveringListingId: Dispatch<SetStateAction<null | number>>;
}

export default function ListingsList({
  listings,
  clickedListingId,
  setClickedListingId,
  setHoveringListingId,
}: Props) {
  return (
    <ul>
      {listings?.map((listing: any) => {
        return (
          <li key={listing.id} className="m-2">
            <ListingCard
              key={listing.id}
              listing={listing}
              clickedListingId={clickedListingId}
              setClickedListingId={setClickedListingId}
              setHoveringListingId={setHoveringListingId}
            />
          </li>
        );
      })}
    </ul>
  );
}
