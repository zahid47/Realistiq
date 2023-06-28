export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSearchParamsObject, sendNextError } from "@/lib/utils";
import { listingsSearchParamsSchema } from "@/schema/listings";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

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

    const session = await getServerSession(authOptions);

    const listings = await db.$transaction([
      db.listing.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          ListingInfo: {
            select: {
              description: true,
              numberOfBeds: true,
              flooAreaInM2: true,
              floor: true,
            },
          },
          ListingPrice: {
            select: {
              price: true,
              currency: true,
              currencySymbol: true,
              rentInterval: true,
            },
          },
          ListingLocation: {
            select: {
              lat: true,
              lng: true,
            },
          },
          ListingPhotos: {
            select: {
              url: true,
              alt: true,
            },
          },
          SavedListings: {
            select: {
              listingId: true,
            },
            where: {
              // @ts-ignore (user.id exists, issue with this version of next auth)
              userId: session?.user?.id,
            },
          },
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
    return sendNextError(err);
  }
}
