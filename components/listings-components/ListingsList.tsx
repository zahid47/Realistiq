"use client";

import ListingCard from "./ListingCard";

export default function ListingsList({ listings }: any) {
  return (
    <ul>
      {listings?.map((listing: any) => {
        return (
          <li key={listing.id} className="m-2">
            <ListingCard key={listing.id} listing={listing} />
          </li>
        );
      })}
    </ul>
  );
}
