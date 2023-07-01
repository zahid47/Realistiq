// GET ONLY, NO MUTATIONS

import "server-only";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { GetListingsPayload } from "@/lib/validators/listing";

export const getListingsFromDB = async ({
  page,
  limit = 50,
  sort_by,
  sort_order,
}: GetListingsPayload) => {
  const user = await getCurrentUser();

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
      where: { status: "PUBLISHED" },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { [sort_by]: sort_order },
    }),
    db.listing.count(),
  ]);

  const meta = {
    total: listings[1],
    per_page: limit,
    from: listings[0].length ? (page - 1) * limit + 1 : 0,
    to: listings[0].length ? page * limit : 0,
    current_page: page,
    total_pages: Math.ceil(listings[1] / limit),
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
