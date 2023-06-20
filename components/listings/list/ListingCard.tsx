"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Dispatch, SetStateAction } from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ImageCarousel from "./ImageCarousel";
import ListingTitle from "./ListingTitle";
import ListingPrice from "./ListingPrice";
import ListingCTA from "./ListingCTA";

interface Props {
  listing: any;
  clickedListingId: null | number;
  setHoveringListingId: Dispatch<SetStateAction<null | number>>;
}

export default function ListingCard({
  listing,
  clickedListingId,
  setHoveringListingId,
}: Props) {
  const listingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listingRef?.current) return;
    if (!clickedListingId) return;

    if (clickedListingId === listing.id) {
      listingRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [clickedListingId, listing.id]);

  return (
    <Card
      className={cn(
        clickedListingId === listing.id &&
          `border-4 border-deep-purple-600 transition-all duration-100 ease-in-out`
      )}
      ref={listingRef}
      onMouseEnter={() => {
        setHoveringListingId(listing.id);
      }}
      onMouseLeave={() => {
        setHoveringListingId(null);
      }}
    >
      <CardContent className="flex items-center gap-4">
        <ImageCarousel images={listing.ListingPhotos} />

        <div>
          <ListingTitle listing={listing} />
          <ListingCTA />
          <ListingPrice listingPrice={listing.ListingPrice} />
        </div>
      </CardContent>
    </Card>
  );
}
