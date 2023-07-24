import { z } from "zod";
import { ExtendedListing, Meta } from "@/types/db";
import { get, post } from "@/lib/customFetch";
import {
  createListingSchema,
  GetListingsPayload,
} from "@/lib/validators/listing";

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

export async function createListing(
  values: z.infer<typeof createListingSchema>
): Promise<ExtendedListing> {
  return await post(`/listings`, values);
}
