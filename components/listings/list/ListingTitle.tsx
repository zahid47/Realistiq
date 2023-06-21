import ListingBadges from "./ListingBadges";

interface Props {
  listing: any;
}

export default function ListingTitle({ listing }: Props) {
  return (
    <>
      <ListingBadges listingInfo={listing.ListingInfo} />
      <h1 className="text-xl font-bold line-clamp-2">{listing.title}</h1>
      <h2 className="line-clamp-3">{listing.ListingInfo.description}</h2>
    </>
  );
}
