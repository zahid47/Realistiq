"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getListings } from "@/actions/api-calls/listing";
import { useQuery } from "@tanstack/react-query";
import { ExtendedListing } from "@/types/db";
import { getSearchParamsString } from "@/lib/utils";
import { GetListingsPayload } from "@/lib/validators/listing";
import { ScrollArea } from "@/components/ui/scroll-area";
import ListingPagination from "./list/ListingPagination";
import ListingsList from "./list/ListingsList";
import ListingsMap from "./map/ListingsMap";

interface Props {
  searchParams: GetListingsPayload;
}

export default function Listings({ searchParams }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const listingsQueryResult = useQuery({
    queryKey: ["listings", searchParams],
    queryFn: () => getListings(searchParams),
    keepPreviousData: true,
    enabled: false,
  });

  const [popup, setPopup] = useState<ExtendedListing | null>(null);
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

  if (!listingsQueryResult.isSuccess) return null;

  return (
    <div className="flex">
      <div className="m-auto flex h-[calc(100vh-4rem)] flex-col lg:w-[38%]">
        {/* <div className="flex justify-between"> */}
        <ListingPagination
          meta={listingsQueryResult.data?.meta}
          onPageChange={onPageChange}
        />
        {/* </div> */}
        <ScrollArea className="">
          <ListingsList
            listingsQueryResult={listingsQueryResult}
            clickedListingId={clickedListingId}
            setHoveringListingId={setHoveringListingId}
            setPopup={setPopup}
          />
        </ScrollArea>
      </div>
      <div className="mb-2 mr-2 hidden overflow-hidden rounded-lg lg:block lg:w-[62%]">
        <ListingsMap
          listingsQueryResult={listingsQueryResult}
          setClickedListingId={setClickedListingId}
          hoveringListingId={hoveringListingId}
          popup={popup}
          setPopup={setPopup}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
}
