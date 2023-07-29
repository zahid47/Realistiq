"use client";

import { useState } from "react";
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
import { getSearchParamsObject, getSearchParamsString } from "@/lib/utils";
import { GetListingsPayload } from "@/lib/validators/listing";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button, buttonVariants } from "../ui/button";
import ListingPagination from "./list/ListingPagination";
import ListingsList from "./list/ListingsList";
import SavedToggle from "./list/SavedToggle";
import SortingDropdown from "./list/SortingDropdown";
import ListingsMap from "./map/ListingsMap";

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
        <div className="flex items-center justify-between gap-2 border-t border-gray-200 px-2 py-3">
          <div className="flex justify-start gap-2">
            <SortingDropdown searchParams={searchParams} />
            <SavedToggle searchParams={searchParams} />
          </div>
          <Button variant="outline" disabled={!isFiltering}>
            <a href={`/${lang}/listings`} className="flex items-center gap-1">
              <X className="h-4 w-4" />{" "}
              <span className="hidden sm:block">Clear filters</span>
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
          <div className="my-4 mr-2 flex justify-end">
            <ListingPagination
              meta={listingsQueryResult.data?.meta}
              onPageChange={onPageChange}
            />
          </div>
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
