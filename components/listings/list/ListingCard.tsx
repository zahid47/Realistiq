"use client";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { ExtendedListing } from "@/types/db";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ImageCarousel from "./ImageCarousel";
import ListingBadges from "./ListingBadges";
import ListingPrice from "./ListingPrice";

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
  const { lang } = useParams();

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
        "relative transition-all duration-100 ease-in-out hover:bg-slate-50",
        clickedListingId === listing.id && `border-4 border-primary`
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
      <CardContent className="flex flex-col items-center gap-4 md:flex-row lg:flex-col 3xl:flex-row">
        <ImageCarousel
          photos={listing.photos}
          listingId={listing.id}
          isSaved={!!listing.saved.length}
        />

        <Link
          href={`/${lang}/listings/${listing.uuid}`}
          className="flex flex-col gap-1"
        >
          <h1 className="line-clamp-2 text-center text-lg font-semibold md:text-start">
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
