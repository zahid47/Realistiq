import Image from "next/image";
import { ExtendedListing } from "@/types/db";
import { formatPrice, pluralized } from "@/lib/utils";

interface Props {
  popup: ExtendedListing;
}

export default function PopupInfo({ popup }: Props) {
  return (
    <div className="flex space-x-4">
      <div>
        <Image
          src={popup.photos[0].url}
          alt={popup.photos[0].alt}
          width={100}
          height={100}
          className="rounded-sm"
        />
      </div>
      <div>
        <div className="pb-2 font-bold">{popup.location.address}</div>

        <div>
          <span className="pr-2">
            <span className="font-bold">{popup.details.floor_area}</span>{" "}
            <span className="text-slate-500">SqFt</span>
          </span>
          &#x2022;
          <span className="px-2">
            <span className="font-bold">{popup.details.beds}</span>{" "}
            <span className="text-slate-500">
              Bed{pluralized(popup.details.beds)}
            </span>
          </span>
          &#x2022;
          <span className="pl-2">
            <span className="font-bold">{popup.details.baths}</span>{" "}
            <span className="text-slate-500">
              Bath{pluralized(popup.details.baths)}
            </span>
          </span>
        </div>

        <div>
          <span className="font-bold">
            {formatPrice(popup.price.amount, popup.price.currency)}
          </span>{" "}
          <span className="text-slate-500">
            /{popup.price.interval.toLowerCase()}
          </span>
        </div>
      </div>
    </div>
  );
}
