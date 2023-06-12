"use server";

import { db } from "@/lib/db";

export default async function getListings() {
  const listings = await db.listing.findMany({
    include: {
      user: true,
    },
  });

  return listings;
}
