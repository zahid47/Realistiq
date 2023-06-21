import { formatPrice } from "@/lib/utils";

interface Props {
  listingPrice: any;
}

export default function ListingPrice({ listingPrice }: Props) {
  return (
    <p className="mt-2">
      <span className="text-lg font-bold">
        {formatPrice(listingPrice.price, listingPrice.currency)}
      </span>{" "}
      <span className="text-sm text-blue-gray-400">
        {listingPrice.rentInterval.toLowerCase()}
      </span>
    </p>
  );
}
