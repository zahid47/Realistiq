import { pluralized } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Props {
  listingInfo: any;
}

export default function ListingBadges({ listingInfo }: Props) {
  return (
    <div className="flex gap-1">
      <Badge variant="outline">
        {listingInfo.numberOfBeds} Bed
        {pluralized(listingInfo.numberOfBeds)}
      </Badge>

      {listingInfo.hasElevator && (
        <Badge variant="outline">Includes Elevator</Badge>
      )}
    </div>
  );
}
