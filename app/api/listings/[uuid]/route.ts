import { NextRequest, NextResponse } from "next/server";
import { getListingFromDB } from "@/actions/db-calls/listing";
import { sendNextError } from "@/lib/utils";

interface Context {
  params: {
    uuid: string;
  };
}

export async function GET(_request: NextRequest, context: Context) {
  const uuid = context.params.uuid;
  try {
    const listing = await getListingFromDB(uuid);

    return NextResponse.json(listing);
  } catch (err) {
    return sendNextError(err);
  }
}
