import { env } from "@/env.mjs";
import { z } from "zod";

const bodySchema = z.object({
  listingId: z.coerce.number().int().positive(),
});

export async function addOrRemoveSaved(listingId: number) {
  const url = new URL(`${env.NEXT_PUBLIC_APP_URL}/api/saved-listings`);
  const body = bodySchema.parse({ listingId });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return await res.json();
}
