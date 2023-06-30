"use client";

import { getListings } from "@/actions/api-calls/listing";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSearchParamsString } from "@/lib/utils";
import {
  GetListingsPayload,
  getListingsPayload,
} from "@/lib/validators/listing";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ListingPagination from "./list/ListingPagination";
import ListingsList from "./list/ListingsList";
import ListingsMap from "./map/ListingsMap";

interface Props {
  searchParams: GetListingsPayload;
}

export default function Listings({ searchParams }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const payload = getListingsPayload.parse(searchParams);

  const listingsQueryResult = useQuery({
    queryKey: ["listings", payload],
    queryFn: () => getListings(payload),
    keepPreviousData: true,
    enabled: false,
  });

  const [popup, setPopup] = useState<any>(null);
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
      <ScrollArea className="h-[calc(100vh-4rem)] lg:w-2/5">
        <ListingPagination
          meta={listingsQueryResult.data?.meta}
          onPageChange={onPageChange}
        />
        <ListingsList
          listingsQueryResult={listingsQueryResult}
          clickedListingId={clickedListingId}
          setHoveringListingId={setHoveringListingId}
          setPopup={setPopup}
        />
      </ScrollArea>
      <div className="mb-2 mr-2 hidden overflow-hidden rounded-lg lg:block lg:w-3/5">
        <ListingsMap
          listingsQueryResult={listingsQueryResult}
          setClickedListingId={setClickedListingId}
          hoveringListingId={hoveringListingId}
          popup={popup}
          setPopup={setPopup}
        />
      </div>
    </div>
  );
}
