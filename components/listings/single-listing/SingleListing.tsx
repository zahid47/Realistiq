"use client";

import { useState } from "react";
import { getListing } from "@/actions/api-calls/listing";
import { useQuery } from "@tanstack/react-query";
import ListingDetailsSkeleton from "@/components/skeletons/ListingDetailsSkeleton";
import BookmarkShare from "./BookmarkShare";
import Description from "./Description";
import Details from "./Details";
import Photos from "./Photos";
import ProfileCardCTA from "./ProfileCardCTA";
import StaticMap from "./StaticMap";

interface Props {
  uuid: string;
}

export default function SingleListing({ uuid }: Props) {
  const listingDetailsQueryResult = useQuery({
    queryKey: ["listing", uuid],
    queryFn: () => getListing(uuid),
  });

  const [saved, setSaved] = useState(
    !!listingDetailsQueryResult.data?.saved.length
  );

  if (listingDetailsQueryResult.isLoading) {
    return <ListingDetailsSkeleton />;
  }

  if (!listingDetailsQueryResult.isSuccess) return null;

  const listing = listingDetailsQueryResult.data;

  return (
    <div className="flex">
      <div className="m-auto flex h-[calc(100vh-4rem)] w-[38%] flex-col p-4">
        <Photos photos={listing.photos} />
      </div>

      <div className="m-auto flex h-[calc(100vh-4rem)] w-[62%] flex-col border-l-2 p-4">
        <div className="space-y-6">
          <div className="flex gap-2">
            <StaticMap listing={listing} saved={saved} />
            <ProfileCardCTA listing={listing} />
          </div>

          <Details listing={listing} />
          <BookmarkShare listing={listing} saved={saved} setSaved={setSaved} />

          <Description description={listing.details.description} />
        </div>
      </div>
    </div>
  );
}
