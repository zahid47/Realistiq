import { Mail } from "lucide-react";
import { ExtendedListing } from "@/types/db";
import { cn, formatPrice } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import ListingPriceComp from "../list/ListingPrice";

interface Props {
  listing: ExtendedListing;
}

export default function ProfileCardCTA({ listing }: Props) {
  const pricePerSqFt = listing.price.amount / listing.details.floor_area;

  return (
    <div className="flex w-1/3 flex-col justify-end space-y-4 rounded-lg border p-4">
      <div>
        <ListingPriceComp price={listing.price} />
        <p>
          <span className="text-sm">
            <span className="text-slate-500">Price per sqft:</span>{" "}
            <span className="font-bold">
              {formatPrice(pricePerSqFt, listing.price.currency)}
            </span>
          </span>
        </p>
      </div>
      <div className="rounded-lg bg-muted p-4">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={listing.owner.image as string}
              alt={listing.owner.name as string}
            />
            <AvatarFallback>{listing.owner.name![0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {listing.owner.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {listing.owner.email}
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-2">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${listing.location.lat},${listing.location.lng}`}
          target="_blank"
          className={cn(buttonVariants({ variant: "outline" }), "flex-grow")}
        >
          Get directions
        </a>
        <a
          href={`mailto:${listing.owner.email}`}
          className={cn(buttonVariants({ variant: "default" }), "flex-grow")}
        >
          <Mail className="mr-2 h-4 w-4" /> Contact owner
        </a>
      </div>
    </div>
  );
}
