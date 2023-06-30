interface Props {
  address: string;
}

export default function ListingAddress({ address }: Props) {
  return (
    <>
      <h1 className="line-clamp-2 text-lg font-bold">{address}</h1>
    </>
  );
}
