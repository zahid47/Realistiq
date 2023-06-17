"use client";

import ListingsMap from "./ListingsMap";
import { useQuery } from "@tanstack/react-query";
import getListings from "@/actions/getListings";
import ListingsList from "./ListingsList";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Listings() {
  const { data: listings } = useQuery({
    queryKey: ["listings"],
    queryFn: getListings,
  });

  return (
    <div className="flex flex-row">
      <ScrollArea className="max-h-screen w-1/3">
        <ListingsList listings={listings} />
      </ScrollArea>
      <div className="w-2/3">
        <ListingsMap listings={listings} />
      </div>
    </div>
  );
}
