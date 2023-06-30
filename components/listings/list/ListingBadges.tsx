import { pluralized } from "@/lib/utils";
import type { ListingDetails } from "@prisma/client";
import { Icons } from "@/components/ui/Icons";

interface Props {
  details: ListingDetails;
}

export default function ListingBadges({ details }: Props) {
  return (
    <div className="flex gap-7">
      <div className="flex items-center gap-1">
        <Icons.SqFt className="text-primary" />
        <p>{details.floor_area} SqFt</p>
      </div>

      <div className="flex items-center gap-1">
        <Icons.Bed className="text-primary" />
        <p>
          {details.beds} Bed
          {pluralized(details.beds)}
        </p>
      </div>

      <div className="flex items-center gap-1">
        <Icons.Bath className="text-primary" />
        <p>
          {details.baths} Bath
          {pluralized(details.baths)}
        </p>
      </div>
    </div>
  );
}
