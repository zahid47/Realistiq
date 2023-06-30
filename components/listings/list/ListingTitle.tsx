import ListingBadges from "./ListingBadges";
import { ExtendedListing } from "@/types/db";

interface Props {
  listing: ExtendedListing;
}

export default function ListingTitle({ listing }: Props) {
  return (
    <>
      <ListingBadges listingInfo={listing.ListingInfo} />
      <h1 className="line-clamp-2 text-xl font-bold">{listing.title}</h1>
      <h2 className="line-clamp-3">{listing.ListingInfo.description}</h2>
    </>
  );
}
