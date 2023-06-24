"use client";

import ListingsMap from "./map/ListingsMap";
import { useQuery } from "@tanstack/react-query";
import { getListings } from "@/actions/listing";
import ListingsList from "./list/ListingsList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function Listings() {
  const listingsQueryResult = useQuery({
    queryKey: ["listings"],
    queryFn: getListings,
  });

  const [clickedListingId, setClickedListingId] = useState<number | null>(null);
  const [hoveringListingId, setHoveringListingId] = useState<number | null>(
    null
  );

  return (
    <div className="flex flex-row">
      <ScrollArea className="h-[calc(100vh-4rem)] w-2/5">
        <ListingsList
          listingsQueryResult={listingsQueryResult}
          clickedListingId={clickedListingId}
          setHoveringListingId={setHoveringListingId}
        />
      </ScrollArea>
      <div className="mb-2 mr-2 w-3/5 overflow-hidden rounded-lg">
        <ListingsMap
          listingsQueryResult={listingsQueryResult}
          setClickedListingId={setClickedListingId}
          hoveringListingId={hoveringListingId}
        />
      </div>
    </div>
  );
}
