import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const listings = await db.listing.findMany({
    include: {
      user: true,
    },
  });

  return NextResponse.json(listings);
}
