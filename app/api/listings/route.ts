// const listings = await db.$transaction([
//   db.listing.findMany({
//     include: {
//       user: true,
//       ListingInfo: true,
//       ListingPrice: true,
//       ListingLocation: true,
//       ListingPhotos: true,
//     },
//     take: 50,
//     orderBy: { id: "desc" },
//   }),
//   db.listing.count(),
// ]);

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSearchParamsObject } from "@/lib/utils";
import { listingsSearchParamsSchema } from "@/schema/listings";

export async function GET(request: NextRequest) {
  try {
    const { page, limit, sort } = listingsSearchParamsSchema.parse(
      getSearchParamsObject(request.nextUrl.searchParams)
    );

    const listings = await db.listing.findMany({
      include: {
        user: true,
        ListingInfo: true,
        ListingPrice: true,
        ListingLocation: true,
        ListingPhotos: true,
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        [sort.key]: sort.direction,
      },
    });

    return NextResponse.json(listings);
  } catch (err) {
    return NextResponse.json(err);
  }
}
