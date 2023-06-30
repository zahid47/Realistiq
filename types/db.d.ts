import type {
  User,
  Listing,
  ListingDetails,
  ListingPrice,
  ListingLocation,
  ListingPhotos,
  SavedListings,
} from "@prisma/client";

export type ExtendedListing = Listing & {
  user: User;
  details: ListingDetails;
  price: ListingPrice;
  location: ListingLocation;
  photos: Array<ListingPhotos>;
  saved: Array<SavedListings>;
};

export type Meta = {
  total: number;
  per_page: number;
  from: number;
  to: number;
  current_page: number;
  total_pages: number;
};
