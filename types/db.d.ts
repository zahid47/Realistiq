import type {
  User,
  Listing,
  ListingInfo,
  ListingPrice,
  ListingLocation,
  ListingPhotos,
  SavedListings,
} from "@prisma/client";

export type ExtendedListing = Listing & {
  user: User;
  ListingInfo: ListingInfo;
  ListingPrice: ListingPrice;
  ListingLocation: ListingLocation;
  ListingPhotos: Array<ListingPhotos>;
  SavedListings: Array<SavedListings>;
};

export type Meta = {
  total: number;
  per_page: number;
  from: number;
  to: number;
  current_page: number;
  total_pages: number;
};
