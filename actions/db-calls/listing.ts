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
  } = getListingsPayload.parse(payload);

  const user = await getCurrentUser();
  let parsedBounds: Bounds | null = null;

  if (bounds) {
    try {
      parsedBounds = boundsSchema.parse(JSON.parse(bounds));
    } catch {}
  }

  const filters = {
    status: "ACTIVE",
    ...(user &&
      saved === "true" && {
        saved: {
          some: {
            user_id: user.id,
          },
        },
      }),
    ...(owner_id && {
      user_id: owner_id,
    }),
    ...(parsedBounds && {
      location: {
        AND: [
          { lng: { gte: parsedBounds[0][0] } },
          { lng: { lte: parsedBounds[1][0] } },
          { lat: { gte: parsedBounds[0][1] } },
          { lat: { lte: parsedBounds[1][1] } },
        ],
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
