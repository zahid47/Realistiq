import getQueryClient from "@/lib/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import HydrateWrapper from "@/components/providers/Hydrate";
import Listings from "@/components/listings/Listings";
import { listingsSearchParamsSchema } from "@/schema/listings";
import { db } from "@/lib/db";
import { getServerAuthSession } from "@/lib/auth";

interface Props {
  searchParams: {
    page: string;
  };
}

const getListingsFromDB = async (payload: any) => {
  const {
    page,
    limit = 50,
    sort_by,
    sort_order,
  } = listingsSearchParamsSchema.parse(payload);

  const session = await getServerAuthSession();

  const listings = await db.$transaction([
    db.listing.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        ListingInfo: {
          select: {
            description: true,
            numberOfBeds: true,
            flooAreaInM2: true,
            floor: true,
          },
        },
        ListingPrice: {
          select: {
            price: true,
            currency: true,
            currencySymbol: true,
            rentInterval: true,
          },
        },
        ListingLocation: {
          select: {
            lat: true,
            lng: true,
          },
        },
        ListingPhotos: {
          select: {
            url: true,
            alt: true,
          },
        },
        SavedListings: {
          select: {
            listingId: true,
            userId: true,
          },
          where: {
            userId: session?.user?.id || "",
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

  const res = { listings: listings[0], meta };

  console.log(res);

  return res;
};

export default async function ListingsPage({ searchParams }: Props) {
  const parsedSearchParams = listingsSearchParamsSchema.parse(searchParams);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["listings", parsedSearchParams.page],
    queryFn: () => getListingsFromDB({ page: parsedSearchParams.page }),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateWrapper state={dehydratedState}>
      <Listings searchParams={parsedSearchParams} />
    </HydrateWrapper>
  );
}
