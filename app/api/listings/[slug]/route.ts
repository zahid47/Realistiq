import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

interface Context {
  params: {
    slug: string;
  };
}

export async function GET(_request: NextRequest, context: Context) {
  const listing = await db.listing.findUniqueOrThrow({
    where: { slug: context.params.slug },
    include: {
      user: true,
      ListingInfo: true,
      ListingPrice: true,
      ListingLocation: true,
      ListingPhotos: true,
    },
  });

  return NextResponse.json(listing);
}
