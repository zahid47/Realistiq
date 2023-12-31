import { NextRequest, NextResponse } from "next/server";
import { getListingsFromDB } from "@/actions/db-calls/listing";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { checkPlan } from "@/lib/plan";
import { getRequestBodyGracefully, sendNextError } from "@/lib/utils";
import {
  createListingSchema,
  getListingsPayload,
} from "@/lib/validators/listing";

export const dynamic = "force-dynamic";

const getSearchParamsObject = (searchParams: URLSearchParams) => {
  return Object.fromEntries(searchParams);
};

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

    const { isAgency } = await checkPlan();
    if (!isAgency) {
      const { listings: UserLisings } = await getListingsFromDB({
        owner_id: user.id,
        limit: 2,
        page: 1,
        saved: "false",
        sort: "Latest",
      });
      if (UserLisings.length >= 1) {
        return NextResponse.json(
          {
            error: "You have reached the maximum number of listings",
          },
          { status: 403 }
        );
      }
    }

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
        owner_id: user.id,
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
        photos: {
          create: photos,
        },
      },
    });

    // create listing location
    const coords = `POINT(${parsedBody.longitude} ${parsedBody.latitude})`;
    const rawQuery = `
      INSERT INTO listing_location (lat, lng, coords, address, listing_id) 
      VALUES (${parsedBody.latitude}, ${parsedBody.longitude}, '${coords}', '${parsedBody.address}', ${newListing.id});
    `;

    // FIXME
    await db.$queryRawUnsafe(rawQuery).catch(async () => {
      await db.listing.delete({
        where: {
          id: newListing.id,
        },
      });
    });

    return NextResponse.json(newListing);
  } catch (err) {
    return sendNextError(err);
  }
}
