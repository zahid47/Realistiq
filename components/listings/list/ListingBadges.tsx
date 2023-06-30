import { pluralized } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { ListingDetails } from "@prisma/client";

interface Props {
  details: ListingDetails;
}

export default function ListingBadges({ details }: Props) {
  return (
    <div className="flex gap-1">
      <Badge variant="outline">
        {details.beds} Bed
        {pluralized(details.beds)}
      </Badge>

      <Badge variant="outline">
        {details.baths} Bath
        {pluralized(details.baths)}
      </Badge>

      <Badge variant="outline">{details.floor_area} SqFt</Badge>
    </div>
  );
}
