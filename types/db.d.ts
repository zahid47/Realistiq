import type {
  Listing,
  ListingDetails,
  ListingLocation,
  ListingPhotos,
  ListingPrice,
  SavedListings,
  User,
} from "@prisma/client";

export type ExtendedListing = Listing & {
  owner: User;
  details: ListingDetails;
  price: ListingPrice;
  location: ListingLocation;
  photos: Array<ListingPhotos>;
  saved: Array<SavedListings>;
};

export type Meta = {
  total: number;
  per_page: number;
  current_page: number;
  total_pages: number;
};
