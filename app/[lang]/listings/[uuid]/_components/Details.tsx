import { ExtendedListing } from "@/types/db";
import ListingBadges from "../../_components/ListingBadges";

interface Props {
  listing: ExtendedListing;
}

export default function Details({ listing }: Props) {
  return (
    <>
      <h1 className="mb-2 text-2xl font-semibold">
        {listing.location.address}
      </h1>
      <ListingBadges details={listing.details} />
    </>
  );
}
