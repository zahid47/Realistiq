import { formatPrice } from "@/lib/utils";
import { ListingPrice } from "@prisma/client";

interface Props {
  price: ListingPrice;
}

export default function ListingPrice({ price }: Props) {
  return (
    <div className="mt-2">
      <p className="text-sm text-slate-500">Rent</p>
      <span className="text-lg font-bold">
        {formatPrice(price.amount, price.currency)}
      </span>{" "}
      <span className="text-sm text-slate-500">
        /{price.interval.toLowerCase()}
      </span>
    </div>
  );
}
