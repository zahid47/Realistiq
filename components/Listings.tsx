"use client";

import { useQuery } from "@tanstack/react-query";
import getListings from "@/actions/getListings";
import Link from "next/link";

export default function Listings() {
  const { data: listings } = useQuery({
    queryKey: ["listings"],
    queryFn: getListings,
  });

  return (
    <ul>
      {listings?.map((listing: any) => {
        return (
          <li key={listing.id}>
            <Link href={`/listings/${listing.id}`}>{listing.title}</Link>
          </li>
        );
      })}
    </ul>
  );
}
