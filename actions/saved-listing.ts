import { env } from "@/env.mjs";
import { post } from "@/lib/customFetch";
import { z } from "zod";

const bodySchema = z.object({
  listingId: z.coerce.number().int().positive(),
});

export async function addOrRemoveSaved(listingId: number) {
  const parsedBody = bodySchema.parse({ listingId });
  return await post("/saved-listings", parsedBody);
}
