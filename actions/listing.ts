import { env } from "@/env.mjs";
import { listingsSearchParamsSchema } from "@/schema/listings";
import { z } from "zod";

export async function getListings(
  data?: z.input<typeof listingsSearchParamsSchema>
) {
  const { page } = listingsSearchParamsSchema.parse(data);
  const query = new URLSearchParams({ page: page.toString() });
  const url = new URL(`${env.NEXT_PUBLIC_APP_URL}/api/listings?${query}`);
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return await res.json();
}

export async function getListing(slug: string) {
  const url = new URL(`${env.NEXT_PUBLIC_APP_URL}/api/listings/${slug}`);
  const res = await fetch(url, { next: { revalidate: 60 } });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return await res.json();
}
