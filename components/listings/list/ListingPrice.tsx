import { formatPrice } from "@/lib/utils";
import { ListingPrice } from "@prisma/client";

interface Props {
  price: ListingPrice;
}

export default function ListingPrice({ price }: Props) {
  return (
    <p className="mt-2">
      <span className="text-lg font-bold">
        {formatPrice(price.amount, price.currency)}
      </span>{" "}
      <span className="text-blue-gray-400 text-sm">
        {price.interval.toLowerCase()}
      </span>
    </p>
  );
}
