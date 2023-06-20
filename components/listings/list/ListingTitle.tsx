interface Props {
  listing: any;
}

export default function ListingTitle({ listing }: Props) {
  return (
    <>
      <h1 className="my-2 text-xl font-bold line-clamp-2">{listing.title}</h1>
      <h2 className="mb-2 line-clamp-3">{listing.ListingInfo.description}</h2>
    </>
  );
}
