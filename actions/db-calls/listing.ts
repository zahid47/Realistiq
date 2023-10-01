// GET ONLY, NO MUTATIONS

import "server-only";
import { Meta } from "@/types/db";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  Bounds,
  boundsSchema,
  GetListingsPayload,
  getListingsPayload,
} from "@/lib/validators/listing";

const sortQueryMap = new Map([
  ["Latest", { created_at: "desc" }],
  ["Cheapest", { price: { amount: "asc" } }],
  ["Most expensive", { price: { amount: "desc" } }],
  ["Largest", { details: { floor_area: "desc" } }],
  ["Smallest", { details: { floor_area: "asc" } }],
]);

export const getListingsFromDB = async (payload: GetListingsPayload) => {
  const {
    page,
    limit = 50,
    sort,
    bounds,
    saved,
    owner_id,
    max_beds,
    min_beds,
    max_baths,
    min_baths,
    max_floor_area,
    min_floor_area,
    max_rent,
  } = getListingsPayload.parse(payload);

  const user = await getCurrentUser();
  let parsedBounds: Bounds | null = null;
  let listingIdsWithinBounds: number[] | null = null;

  if (bounds) {
    const parseResults = boundsSchema.safeParse(JSON.parse(bounds));
    if (parseResults.success) {
      parsedBounds = parseResults.data;
    }
  }

  if (parsedBounds) {
    const min_lng = parsedBounds[0][0];
    const max_lng = parsedBounds[1][0];
    const min_lat = parsedBounds[0][1];
    const max_lat = parsedBounds[1][1];

    const res: Array<{ listing_id: number }> = await db.$queryRaw`
      SELECT listing_id
      FROM listing_location
      WHERE coords && ST_SetSRID(ST_MakeBox2D(ST_Point(${min_lng}, ${min_lat}), ST_Point(${max_lng}, ${max_lat})), 4326)
    `;

    listingIdsWithinBounds = res.map((r) => r.listing_id);
  }

  const filters = {
    status: "ACTIVE",
    ...{
      details: {
        beds: {
          lte: max_beds,
          gte: min_beds,
        },
        baths: {
          lte: max_baths,
          gte: min_baths,
        },
        floor_area: {
          lte: max_floor_area,
          gte: min_floor_area,
        },
      },
      ...(max_rent && {
        price: {
          amount: {
            lte: max_rent,
          },
        },
      }),
    },
    ...(user &&
      saved === "true" && {
        saved: {
          some: {
            user_id: user.id,
          },
        },
      }),
    ...(owner_id && {
      owner_id,
    }),
    ...(listingIdsWithinBounds && {
      id: {
        in: listingIdsWithinBounds,
      },
    }),
  } as const;

  // TODO: fix types
  const orderBy = sortQueryMap.get(sort) as any;

  const listings = await db.$transaction([
    db.listing.findMany({
      select: {
        id: true,
        uuid: true,
        details: {
          select: {
            description: true,
            beds: true,
            baths: true,
            floor_area: true,
          },
        },
        price: {
          select: {
            amount: true,
            currency: true,
            symbol: true,
            interval: true,
          },
        },
        location: {
          select: {
            lat: true,
            lng: true,
            address: true,
          },
        },
        photos: {
          select: {
            url: true,
            alt: true,
          },
        },
        saved: {
          select: {
            listing_id: true,
            user_id: true,
          },
          where: {
            user_id: user?.id || "",
          },
        },
      },
      where: filters,
      take: limit,
      skip: (page - 1) * limit,
      orderBy,
    }),
    db.listing.count({
      where: filters,
    }),
  ]);

  const total = listings[1];

  const meta: Meta = {
    total,
    per_page: limit,
    current_page: page,
    total_pages: Math.ceil(total / limit),
  };

  return { listings: listings[0], meta };
};

export const getListingFromDB = async (uuid: string) => {
  const user = await getCurrentUser();

  return await db.listing.findUnique({
    select: {
      id: true,
      uuid: true,
      owner: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      details: {
        select: {
          description: true,
          beds: true,
          baths: true,
          floor_area: true,
        },
      },
      price: {
        select: {
          amount: true,
          currency: true,
          symbol: true,
          interval: true,
        },
      },
      location: {
        select: {
          lat: true,
          lng: true,
          address: true,
        },
      },
      photos: {
        select: {
          url: true,
          alt: true,
        },
      },
      saved: {
        select: {
          listing_id: true,
          user_id: true,
        },
        where: {
          user_id: user?.id || "",
        },
      },
    },
    where: { uuid },
  });
};
