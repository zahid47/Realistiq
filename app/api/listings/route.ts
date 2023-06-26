export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSearchParamsObject } from "@/lib/utils";
import { listingsSearchParamsSchema } from "@/schema/listings";

export async function GET(request: NextRequest) {
  try {
    const {
      page,
      limit = 50,
      sort_by,
      sort_order,
    } = listingsSearchParamsSchema.parse(
      getSearchParamsObject(request.nextUrl.searchParams)
    );

    const listings = await db.$transaction([
      db.listing.findMany({
        include: {
          user: true,
          ListingInfo: true,
          ListingPrice: true,
          ListingLocation: true,
          ListingPhotos: true,
        },
        where: { status: "PUBLISHED" },
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { [sort_by]: sort_order },
      }),
      db.listing.count(),
    ]);

    const meta = {
      total: listings[1],
      per_page: limit,
      from: listings[0].length ? (page - 1) * limit + 1 : 0,
      to: listings[0].length ? page * limit : 0,
      current_page: page,
      total_pages: Math.ceil(listings[1] / limit),
    };

    return NextResponse.json({ listings: listings[0], meta });
  } catch (err) {
    return NextResponse.json({
      error: {
        isError: true,
        error: err,
        context: "Error while fetching listings",
      },
    });
  }
}
