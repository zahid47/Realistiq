"use client";

import ListingsMap from "./map/ListingsMap";
import { useQuery } from "@tanstack/react-query";
import { getListings } from "@/actions/listing";
import ListingsList from "./list/ListingsList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { z } from "zod";
import { listingsSearchParamsSchema } from "@/schema/listings";
import Pagination from "../ui/pagination";
import { getSearchParamsString } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

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

  const onPageChange = (page: number) => {
    const newSearchParams = { ...searchParams, page };
    const qs = getSearchParamsString(newSearchParams);
    const url = `${pathname}?${qs}`;
    router.push(url);
  };

  return (
    <div className="flex flex-row">
      <ScrollArea className="h-[calc(100vh-4rem)] w-2/5">
        <Pagination
          meta={listingsQueryResult.data?.meta}
          onPageChange={onPageChange}
        />
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
