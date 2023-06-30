import { get } from "@/lib/customFetch";
import { GetListingsPayload } from "@/lib/validators/listing";

export async function getListings(payload: GetListingsPayload) {
  return await get("/listings", payload);
}

export async function getListing(slug: string) {
  return await get(`/listings/${slug}`);
}
