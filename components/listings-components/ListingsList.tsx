"use client";

import Link from "next/link";

export default function ListingsList({ listings }: any) {
  return (
    <ul>
      {listings?.map((listing: any) => {
        return (
          <li key={listing.id}>
            <Link href={`/listings/${listing.slug}`}>{listing.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
