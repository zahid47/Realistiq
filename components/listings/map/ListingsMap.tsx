"use client";

import { env } from "@/env.mjs";
import { QueryObserverSuccessResult } from "@tanstack/react-query";
import "mapbox-gl/dist/mapbox-gl.css";
import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ReturnData } from "@/actions/api-calls/listing";
import {
  DEFAULT_LAT,
  DEFAULT_LNG,
  DEFAULT_ZOOM,
  MAPBOX_STYLE,
  MAX_BOUNDS,
  MIN_ZOOM,
} from "@/constants";
import { useLocalStorage } from "@mantine/hooks";
import type { MapRef } from "react-map-gl";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl";
import { ExtendedListing } from "@/types/db";
import { getSearchParamsString } from "@/lib/utils";
import type { Bounds, GetListingsPayload } from "@/lib/validators/listing";
import ListingsMapSkeleton from "../../skeletons/ListingsMapSkeleton";
import MarkerIcon from "./MarkerIcon";

interface Props {
  listingsQueryResult: QueryObserverSuccessResult<ReturnData, unknown>;
  setClickedListingId: Dispatch<SetStateAction<null | number>>;
  hoveringListingId: null | number;
  popup: ExtendedListing | null;
  setPopup: Dispatch<SetStateAction<null | ExtendedListing>>;
  searchParams: GetListingsPayload;
}

export default function ListingsMap({
  listingsQueryResult,
  setClickedListingId,
  hoveringListingId,
  popup,
  setPopup,
  searchParams,
}: Props) {
  const listings = listingsQueryResult.data.listings;
  const mapRef = useRef<MapRef>(null);
  const router = useRouter();
  const pathname = usePathname();

  const bounds =
    searchParams.bounds && (JSON.parse(searchParams.bounds) as Bounds);

  const getCenterOfBounds = () => {
    if (bounds) {
      const centerLng = (bounds[0][0] + bounds[1][0]) / 2;
      const centerLat = (bounds[0][1] + bounds[1][1]) / 2;

      return {
        latitude: centerLat,
        longitude: centerLng,
      };
    }
    return {
      latitude: DEFAULT_LAT,
      longitude: DEFAULT_LNG,
    };
  };

  const { latitude, longitude } = getCenterOfBounds();

  const [viewState, setViewState] = useLocalStorage<any>({
    key: "viewState",
    defaultValue: {
      latitude,
      longitude,
      zoom: DEFAULT_ZOOM,
    },
  });

  const addBoundsToUrl = (bounds: Bounds) => {
    const newSearchParams = { ...searchParams, bounds: JSON.stringify(bounds) };
    const qs = getSearchParamsString(newSearchParams);
    const url = `${pathname}?${qs}`;
    router.push(url);
  };

  const markers = useMemo(
    () =>
      listings.map((listing: ExtendedListing) => (
        <Marker
          key={listing.id}
          latitude={listing.location.lat}
          longitude={listing.location.lng}
          anchor="bottom"
        >
          <MarkerIcon
            onClick={() => {
              setClickedListingId(listing.id);
            }}
            onMouseEnter={() => {
              setPopup(listing);
            }}
            onMouseLeave={() => {
              setPopup(null);
            }}
            isHovering={hoveringListingId === listing.id}
            isSaved={!!listing.saved.length}
          />
        </Marker>
      )),
    [hoveringListingId, listings, setClickedListingId, setPopup]
  );

  if (listingsQueryResult.isLoading) return <ListingsMapSkeleton />;

  return (
    <Map
      {...viewState}
      mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle={MAPBOX_STYLE}
      ref={mapRef}
      onMove={(e) => setViewState(e.viewState)}
      onMoveEnd={() => {
        if (mapRef.current) {
          const bounds = mapRef.current.getMap().getBounds().toArray();
          addBoundsToUrl(bounds);
        }
      }}
      onLoad={() => {
        if (mapRef.current) {
          const bounds = mapRef.current.getMap().getBounds().toArray();
          addBoundsToUrl(bounds);
        }
      }}
      dragRotate={false}
      minZoom={MIN_ZOOM}
      maxBounds={MAX_BOUNDS}
    >
      <NavigationControl showCompass={false} />
      {markers}
      {popup && (
        <Popup
          latitude={popup.location.lat}
          longitude={popup.location.lng}
          closeButton={false}
          offset={[0, -20]}
        >
          {/* TODO */}
          Property for rent in <b>{popup.location.address}</b>
        </Popup>
      )}
    </Map>
  );
}
