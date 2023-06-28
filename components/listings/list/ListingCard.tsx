"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import ImageCarousel from "./ImageCarousel";
import ListingPrice from "./ListingPrice";
import ListingTitle from "./ListingTitle";
import Link from "next/link";
import ListingBookMark from "./ListingBookMark";

interface Props {
  listing: any;
  clickedListingId: null | number;
  setHoveringListingId: Dispatch<SetStateAction<null | number>>;
  setPopup: Dispatch<SetStateAction<null | any>>;
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
        <ImageCarousel images={listing.ListingPhotos} />

        <Link
          href={`/listings/${listing.slug}`}
          className="flex flex-col gap-2"
        >
          <ListingTitle listing={listing} />
          <ListingPrice listingPrice={listing.ListingPrice} />
        </Link>
        <ListingBookMark listingId={listing.SavedListings[0]} />
      </CardContent>
    </Card>
  );
}
