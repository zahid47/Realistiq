"use client";

import { Dispatch, SetStateAction } from "react";
import { useParams } from "next/navigation";
import { ReturnData } from "@/actions/api-calls/listing";
import { QueryObserverSuccessResult } from "@tanstack/react-query";
import { ExtendedListing } from "@/types/db";
import ListingCard from "./ListingCard";
import ListingsListSkeleton from "./ListingsListSkeleton";

interface Props {
  listingsQueryResult: QueryObserverSuccessResult<ReturnData, unknown>;
  clickedListingId: null | number;
  setHoveringListingId: Dispatch<SetStateAction<null | number>>;
  setPopup: Dispatch<SetStateAction<null | ExtendedListing>>;
}

export default function ListingsList({
  listingsQueryResult,
  clickedListingId,
  setHoveringListingId,
  setPopup,
}: Props) {
  const { lang } = useParams();
  const listings = listingsQueryResult.data.listings;
  if (listingsQueryResult.isLoading) return <ListingsListSkeleton />;

  if (!listings?.length)
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>No listings found</h1>
        <h3>
          Please check back later or{" "}
          {/* need to use <a/> here instead of <Link/> because otherwise map doesn't reset */}
          <a
            href={`/${lang}/listings`}
            className="text-primary underline-offset-4 hover:underline"
          >
            clear filters
          </a>
        </h3>
      </div>
    );

  return (
    <ul>
      {listings.map((listing: ExtendedListing) => {
        return (
          <li key={listing.id} className="mb-2 ml-2 mr-2">
            <ListingCard
              key={listing.id}
              listing={listing}
              clickedListingId={clickedListingId}
              setHoveringListingId={setHoveringListingId}
              setPopup={setPopup}
            />
          </li>
        );
      })}
    </ul>
  );
}
