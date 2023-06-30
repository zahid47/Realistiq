import { NextRequest, NextResponse } from "next/server";
import { sendNextError } from "@/lib/utils";
import { getListingFromDB } from "@/actions/db-calls/listing";

interface Context {
  params: {
    slug: string;
  };
}

export async function GET(_request: NextRequest, context: Context) {
  const slug = context.params.slug;
  try {
    const listing = await getListingFromDB(slug);

    return NextResponse.json(listing);
  } catch (err) {
    return sendNextError(err);
  }
}
