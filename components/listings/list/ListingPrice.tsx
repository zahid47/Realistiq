import { formatPrice } from "@/lib/utils";

interface Props {
  listingPrice: any;
}

export default function ListingPrice({ listingPrice }: Props) {
  return (
    <>
      <p className="inline pl-2 text-lg font-bold">
        {formatPrice(listingPrice.price, listingPrice.currency)}
      </p>
      <p className="inline pl-1 text-sm text-blue-gray-400">
        {listingPrice.rentInterval.toLowerCase()}
      </p>
    </>
  );
}
