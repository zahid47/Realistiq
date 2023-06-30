import { get } from "@/lib/customFetch";
import { GetListingsPayload } from "@/lib/validators/listing";
import { ExtendedListing, Meta } from "@/types/db";

export interface ReturnData {
  listings: Array<ExtendedListing>;
  meta: Meta;
}

export async function getListings(
  payload: GetListingsPayload
): Promise<ReturnData> {
  return await get("/listings", payload);
}

export async function getListing(uuid: string): Promise<ExtendedListing> {
  return await get(`/listings/${uuid}`);
}
