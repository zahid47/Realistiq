import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendNextError } from "@/lib/utils";

interface Context {
  params: {
    slug: string;
  };
}

export async function GET(_request: NextRequest, context: Context) {
  try {
    const listing = await db.listing.findUnique({
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
  } catch (err) {
    return sendNextError(err);
  }
}
