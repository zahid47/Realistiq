"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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
  const { toast } = useToast();
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
      className={cn(clickedListingId === listing.id ? `bg-slate-50` : ``)}
      ref={listingRef}
      onMouseEnter={() => {
        setHoveringListingId(listing.id);
      }}
      onMouseLeave={() => {
        setHoveringListingId(null);
      }}
    >
      <CardHeader>
        <CardTitle>{listing.title}</CardTitle>
        <CardDescription>{listing.ListingInfo.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          src={listing.ListingPhotos[0].url}
          alt={listing.ListingPhotos[0].alt}
          height={300}
          width={300}
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            toast({
              title: "Not Available Yet",
              variant: "destructive",
            });
          }}
        >
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
}
