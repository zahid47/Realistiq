"use client";

import ListingsMap from "./map/ListingsMap";
import { useQuery } from "@tanstack/react-query";
import { getListings } from "@/actions/listing";
import ListingsList from "./list/ListingsList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { z } from "zod";
import { listingsSearchParamsSchema } from "@/schema/listings";
import { usePathname, useRouter } from "next/navigation";
import { getSearchParamsString } from "@/lib/utils";

interface Props {
  searchParams: z.infer<typeof listingsSearchParamsSchema>;
}

export default function Listings({ searchParams }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const listingsQueryResult = useQuery({
    queryKey: ["listings", searchParams.page],
    queryFn: () => getListings({ page: searchParams.page }),
    keepPreviousData: true,
    enabled: false, //FIXME: temporary
  });

  const [clickedListingId, setClickedListingId] = useState<number | null>(null);
  const [hoveringListingId, setHoveringListingId] = useState<number | null>(
    null
  );

  return (
    <div className="flex flex-row">
      <ScrollArea className="h-[calc(100vh-4rem)] w-2/5">
        <>
          <button
            onClick={() => {
              const newSearchParams = {
                ...searchParams,
                page: searchParams.page - 1,
              };

              const qs = getSearchParamsString(newSearchParams);
              const url = `${pathname}?${qs}`;

              router.push(url);
            }}
          >
            prev
          </button>
          <span className="mx-2 text-lg font-semibold">
            {searchParams.page}
          </span>
          <button
            onClick={() => {
              const newSearchParams = {
                ...searchParams,
                page: searchParams.page + 1,
              };

              const qs = getSearchParamsString(newSearchParams);
              const url = `${pathname}?${qs}`;

              router.push(url);
            }}
          >
            next
          </button>
        </>
        <ListingsList
          listingsQueryResult={listingsQueryResult}
          clickedListingId={clickedListingId}
          setHoveringListingId={setHoveringListingId}
        />
      </ScrollArea>
      <div className="mb-2 mr-2 w-3/5 overflow-hidden rounded-lg">
        <ListingsMap
          listingsQueryResult={listingsQueryResult}
          setClickedListingId={setClickedListingId}
          hoveringListingId={hoveringListingId}
        />
      </div>
    </div>
  );
}
