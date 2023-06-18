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
  const [hoveringListingId, setHoveringListingId] = useState<number | null>(
    null
  );

  return (
    <div className="flex flex-row">
      <ScrollArea className="h-[calc(100vh-64px)] w-1/3">
        <ListingsList
          listings={listings}
          clickedListingId={clickedListingId}
          setHoveringListingId={setHoveringListingId}
        />
      </ScrollArea>
      <div className="mb-2 mr-2 w-2/3 overflow-hidden rounded-lg">
        <ListingsMap
          listings={listings}
          setClickedListingId={setClickedListingId}
          hoveringListingId={hoveringListingId}
        />
      </div>
    </div>
  );
}
