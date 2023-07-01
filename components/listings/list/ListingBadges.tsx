import type { ListingDetails } from "@prisma/client";
import { pluralized } from "@/lib/utils";
import { Icons } from "@/components/ui/Icons";

interface Props {
  details: ListingDetails;
}

export default function ListingBadges({ details }: Props) {
  return (
    <div className="flex justify-evenly gap-7 md:justify-start">
      <div className="flex flex-col items-center gap-1 sm:flex-row">
        <Icons.SqFt className="text-primary" />
        <p>{details.floor_area} SqFt</p>
      </div>

      <div className="flex flex-col items-center gap-1 sm:flex-row">
        <Icons.Bed className="text-primary" />
        <p>
          {details.beds} Bed
          {pluralized(details.beds)}
        </p>
      </div>

      <div className="flex flex-col items-center gap-1 sm:flex-row">
        <Icons.Bath className="text-primary" />
        <p>
          {details.baths} Bath
          {pluralized(details.baths)}
        </p>
      </div>
    </div>
  );
}
