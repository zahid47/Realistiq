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

export const getListingsFromDB = async (payload: GetListingsPayload) => {
  const {
    page,
    limit = 50,
    sort_by,
    sort_order,
    bounds,
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

  const listings = await db.$transaction([
    db.listing.findMany({
      select: {
        id: true,
        uuid: true,
        _count: {
          select: {
            photos: true,
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
      where: filters,
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { [sort_by]: sort_order },
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
