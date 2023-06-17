"use client";

import ListingsMap from "./ListingsMap";
import { useQuery } from "@tanstack/react-query";
import getListings from "@/actions/getListings";
import ListingsList from "./ListingsList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function Listings() {
  const { data: listings } = useQuery({
    queryKey: ["listings"],
    queryFn: getListings,
  });

  const [clickedListingId, setClickedListingId] = useState<number | null>(null);
  const [hoveringListingId, setHoveringListingId] = useState<number | null>(null);

  return (
    <div className="flex flex-row">
      <ScrollArea className="max-h-screen w-1/3">
        <ListingsList
          listings={listings}
          clickedListingId={clickedListingId}
          setClickedListingId={setClickedListingId}
          setHoveringListingId={setHoveringListingId}
        />
      </ScrollArea>
      <div className="w-2/3">
        <ListingsMap
          listings={listings}
          setClickedListingId={setClickedListingId}
          hoveringListingId={hoveringListingId}
        />
      </div>
    </div>
  );
}
