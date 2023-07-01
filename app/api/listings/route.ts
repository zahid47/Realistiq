import { NextRequest, NextResponse } from "next/server";
import { getListingsFromDB } from "@/actions/db-calls/listing";
import { getSearchParamsObject, sendNextError } from "@/lib/utils";
import { getListingsPayload } from "@/lib/validators/listing";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const parsedPayload = getListingsPayload.parse(
      getSearchParamsObject(request.nextUrl.searchParams)
    );

    const { listings, meta } = await getListingsFromDB(parsedPayload);

    return NextResponse.json({ listings, meta });
  } catch (err) {
    return sendNextError(err);
  }
}
