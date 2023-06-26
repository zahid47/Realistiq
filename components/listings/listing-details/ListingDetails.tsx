"use client";

import { useQuery } from "@tanstack/react-query";
import { getListing } from "@/actions/listing";
import ImageGallery from "./ImageGallery";
import ListingDesctription from "./ListingDesctription";
import ListingPrice from "./ListingPrice";
import ListingAmenities from "./ListingAmenities";
import ListingCTA from "./ListingCTA";

interface Props {
  slug: string;
}

export default function ListingDetails({ slug }: Props) {
  const listingDetailsQueryResult = useQuery({
    queryKey: ["listing", slug],
    queryFn: () => getListing(slug),
  });

  const listing = listingDetailsQueryResult.data;

  return (
    <div className="bg-white">
      <div className="pt-6">
        <ImageGallery photos={listing.ListingPhotos} />
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <ListingDesctription listing={listing} />
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <ListingPrice listingPrice={listing.ListingPrice} />
            <div className="mt-10">
              <ListingAmenities />
              <ListingCTA />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
