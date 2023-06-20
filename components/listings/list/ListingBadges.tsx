import { Icons } from "@/components/ui/Icons";
import { pluralized } from "@/lib/utils";

interface Props {
  listingInfo: any;
}

export default function ListingBadges({ listingInfo }: Props) {
  return (
    <div className="flex gap-4">
      <div className="mb-2 flex items-center gap-2">
        <Icons.Bed />
        <span className="font-bold">
          {listingInfo.numberOfBeds} Bed
          {pluralized(listingInfo.numberOfBeds)}
        </span>
      </div>

      {listingInfo.hasElevator && (
        <div className="mb-2 flex items-center gap-2">
          <Icons.Elevator />
          <span className="font-bold">Includes Elevator</span>
        </div>
      )}
    </div>
  );
}
