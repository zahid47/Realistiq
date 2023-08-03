import { NextRequest, NextResponse } from "next/server";
import { getListingsFromDB } from "@/actions/db-calls/listing";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  getRequestBodyGracefully,
  getSearchParamsObject,
  sendNextError,
} from "@/lib/utils";
import {
  createListingSchema,
  getListingsPayload,
} from "@/lib/validators/listing";

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

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await getRequestBodyGracefully(request);
    const parsedBody = createListingSchema.parse(body);

    const photos = parsedBody.photos.map((photo) => {
      return {
        url: photo,
        alt: "image", //TODO: get alt from user, if not provided, use ai to generate
      };
    });

    const newListing = await db.listing.create({
      data: {
        user_id: user.id,
        details: {
          create: {
            description: parsedBody.description,
            beds: parsedBody.beds,
            baths: parsedBody.baths,
            floor_area: parsedBody.floor_area,
          },
        },
        price: {
          create: {
            amount: parsedBody.amount,
          },
        },
        location: {
          create: {
            lat: parsedBody.latitude,
            lng: parsedBody.longitude,
            address: parsedBody.address,
          },
        },
        photos: {
          create: photos,
        },
      },
    });

    return NextResponse.json(newListing);
  } catch (err) {
    return sendNextError(err);
  }
}
