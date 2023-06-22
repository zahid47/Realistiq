import { env } from "@/env.mjs";

export async function getListings() {
  return await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/listings`).then(
    (response) => response.json()
  );
}

export async function getListing(slug: string) {
  return await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/listings/${slug}`).then(
    (response) => response.json()
  );
}
