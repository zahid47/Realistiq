import { captitalize, formatPrice } from "@/lib/utils";

interface Props {
  listingPrice: any;
}

export default function ListingPrice({ listingPrice }: Props) {
  return (
    <p className="text-3xl tracking-tight text-gray-900">
      {formatPrice(listingPrice.price, listingPrice.currency)}{" "}
      <span className="text-lg text-gray-400">
        {captitalize(listingPrice.rentInterval)}
      </span>
    </p>
  );
}
