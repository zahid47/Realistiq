"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import ImageCarousel from "./ImageCarousel";
import ListingPrice from "./ListingPrice";
import ListingTitle from "./ListingTitle";
import Link from "next/link";

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
          `border-4 border-primary transition-all duration-100 ease-in-out`
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

        <Link
          href={`/listings/${listing.slug}`}
          className="flex flex-col gap-2"
        >
          <ListingTitle listing={listing} />
          <ListingPrice listingPrice={listing.ListingPrice} />
        </Link>
      </CardContent>
    </Card>
  );
}
