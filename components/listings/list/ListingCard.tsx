"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import ImageCarousel from "./ImageCarousel";
import ListingPrice from "./ListingPrice";
import Link from "next/link";
import type { ExtendedListing } from "@/types/db";
import ListingBadges from "./ListingBadges";
import { Separator } from "@/components/ui/separator";

interface Props {
  listing: ExtendedListing;
  clickedListingId: null | number;
  setHoveringListingId: Dispatch<SetStateAction<null | number>>;
  setPopup: Dispatch<SetStateAction<null | ExtendedListing>>;
}

export default function ListingCard({
  listing,
  clickedListingId,
  setHoveringListingId,
  setPopup,
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
        "relative",
        clickedListingId === listing.id &&
          `border-4 border-primary transition-all duration-100 ease-in-out`
      )}
      ref={listingRef}
      onMouseEnter={() => {
        setHoveringListingId(listing.id);
        setPopup(listing);
      }}
      onMouseLeave={() => {
        setHoveringListingId(null);
        setPopup(null);
      }}
    >
      <CardContent className="flex flex-col items-center gap-4 sm:flex-row lg:flex-col 2xl:flex-row">
        <ImageCarousel
          photos={listing.photos}
          listingId={listing.id}
          isSaved={!!listing.saved.length}
        />

        <Link
          href={`/listings/${listing.uuid}`}
          className="flex flex-col gap-1"
        >
          <h1 className="line-clamp-2 text-lg font-semibold">
            {listing.location.address}
          </h1>
          <Separator className="my-2 bg-muted" />
          <ListingBadges details={listing.details} />
          <Separator className="my-2 bg-muted" />
          <ListingPrice price={listing.price} />
        </Link>
      </CardContent>
    </Card>
  );
}
