import { post } from "@/lib/customFetch";

export async function addOrRemoveSaved(listingId: number) {
  const body = { listingId };
  return await post("/saved-listings", body);
}
