"use client";

import { useCallback, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { getListings } from "@/actions/api-calls/listing";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { ExtendedListing } from "@/types/db";
import { getSearchParamsString } from "@/lib/utils";
import { GetListingsPayload } from "@/lib/validators/listing";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../../../../components/ui/button";
import ListingPagination from "./ListingPagination";
import ListingsList from "./ListingsList";
import ListingsMap from "./ListingsMap";
import OtherFilters from "./OtherFilters";
import SavedToggle from "./SavedToggle";
import SortingDropdown from "./SortingDropdown";

interface Props {
  searchParams: GetListingsPayload;
}

export default function Listings({ searchParams }: Props) {
  const router = useRouter();
  const { lang } = useParams();
  const pathname = usePathname();

  const currentSearchParams = useSearchParams();
  const isFiltering = !!Object.keys(Object.fromEntries(currentSearchParams))
    .length;

  const listingsQueryResult = useQuery({
    queryKey: ["listings", searchParams],
    queryFn: () => getListings(searchParams),
    keepPreviousData: true,
  });

  const [popup, setPopup] = useState<ExtendedListing | null>(null);
  const [clickedListingId, setClickedListingId] = useState<number | null>(null);
  const [hoveringListingId, setHoveringListingId] = useState<number | null>(
    null
  );

  const onPageChange = useCallback(
    (page: number) => {
      const newSearchParams = { ...searchParams, page };
      const qs = getSearchParamsString(newSearchParams);
      const url = `${pathname}?${qs}`;
      router.push(url);
    },
    [pathname, router, searchParams]
  );

  if (!listingsQueryResult.isSuccess) return null;

  return (
    <div className="flex">
      <div className="m-auto flex h-[calc(100vh-4rem)] flex-col lg:w-[38%]">
        <div className="flex items-center justify-between gap-2 border-t border-gray-200 px-2 py-3">
          <div className="flex justify-start gap-2">
            <SortingDropdown searchParams={searchParams} />
            <OtherFilters searchParams={searchParams} />
            <SavedToggle searchParams={searchParams} />
          </div>
          <Button variant="outline" disabled={!isFiltering}>
            <a href={`/${lang}/listings`} className="flex items-center gap-1">
              <X className="h-4 w-4" />{" "}
              <span className="hidden 2xl:block">Clear filters</span>
            </a>
          </Button>
        </div>
        <ScrollArea>
          <ListingsList
            listingsQueryResult={listingsQueryResult}
            clickedListingId={clickedListingId}
            setHoveringListingId={setHoveringListingId}
            setPopup={setPopup}
          />
        </ScrollArea>
        <div className="my-4 mr-2 flex justify-end">
          <ListingPagination
            meta={listingsQueryResult.data?.meta}
            onPageChange={onPageChange}
          />
        </div>
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
