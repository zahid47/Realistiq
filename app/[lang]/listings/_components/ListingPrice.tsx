import { ListingPrice } from "@prisma/client";
import { formatPrice } from "@/lib/utils";

interface Props {
  price: ListingPrice;
}

export default function ListingPriceComp({ price }: Props) {
  return (
    <div className="mt-2 text-center md:text-start">
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
