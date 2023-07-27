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
    <div className="flex flex-col md:flex-row">
      <div className="m-auto flex flex-col p-4 md:h-[calc(100vh-4rem)] md:w-[38%]">
        <Photos photos={listing.photos} />
      </div>

      <div className="m-auto flex flex-col p-4 md:h-[calc(100vh-4rem)] md:w-[62%] md:border-l-2">
        <div className="space-y-6">
          <div className="flex flex-col gap-2 lg:flex-row">
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
