"use client";

import ListingsMap from "./ListingsMap";
import { useQuery } from "@tanstack/react-query";
import getListings from "@/actions/getListings";
import ListingsList from "./ListingsList";

export default function Listings() {
  const { data: listings } = useQuery({
    queryKey: ["listings"],
    queryFn: getListings,
  });

  return (
    <div className="flex flex-row">
      <ListingsMap listings={listings} />
      <ListingsList listings={listings} />
    </div>
  );
}
