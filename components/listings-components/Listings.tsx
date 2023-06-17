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
      <div className="max-h-screen w-1/3 overflow-y-auto">
        <ListingsList listings={listings} />
      </div>
      <div className="w-2/3">
        <ListingsMap listings={listings} />
      </div>
    </div>
  );
}
