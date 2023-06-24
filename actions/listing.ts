import { env } from "@/env.mjs";

export async function getListings() {
  const res = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/listings`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return await res.json();
}

export async function getListing(slug: string) {
  const res = await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/listings/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return await res.json();
}
