"use client";

import { env } from "@/env.mjs";
import { cn } from "@/lib/utils";
import { UseQueryResult } from "@tanstack/react-query";
import "mapbox-gl/dist/mapbox-gl.css";
import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import type { MapRef } from "react-map-gl";
import Map, { Marker, Popup, NavigationControl } from "react-map-gl";
import ListingsMapSkeleton from "../../skeletons/ListingsMapSkeleton";

const MAPBOX_TOKEN = env.NEXT_PUBLIC_MAPBOX_TOKEN;
const MAPBOX_STYLE = "mapbox://styles/mapbox/streets-v12";

interface Props {
  listingsQueryResult: UseQueryResult<any, unknown>;
  setClickedListingId: Dispatch<SetStateAction<null | number>>;
  hoveringListingId: null | number;
}

export default function ListingsMap({
  listingsQueryResult,
  setClickedListingId,
  hoveringListingId,
}: Props) {
  const listings = listingsQueryResult.data.listings;
  const mapRef = useRef<MapRef>(null);

  const [viewState, setViewState] = useState({
    longitude: -82.5324,
    latitude: 39.71375,
    zoom: 0,
  });

  const [popup, setPopup] = useState<any>(null);

  const markers = useMemo(
    () =>
      listings &&
      listings.map((listing: any) => (
        <Marker
          key={listing.id}
          latitude={listing.ListingLocation.lat}
          longitude={listing.ListingLocation.lng}
          anchor="bottom"
        >
          <button
            onClick={() => {
              setClickedListingId(listing.id);
            }}
            onMouseEnter={() => {
              setPopup(listing);
            }}
            onMouseLeave={() => {
              setPopup(null);
            }}
            className={cn(
              ` rounded-full border-2 border-white transition-all duration-100 ease-in-out`,
              hoveringListingId === listing.id
                ? `h-5 w-5 bg-amber-400`
                : `h-4 w-4 bg-violet-600`
            )}
          />
        </Marker>
      )),
    [hoveringListingId, listings, setClickedListingId]
  );

  if (listingsQueryResult.isLoading) return <ListingsMapSkeleton />;

  return (
    <Map
      {...viewState}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle={MAPBOX_STYLE}
      ref={mapRef}
      onMove={(e) => setViewState(e.viewState)}
      dragRotate={false}
    >
      <NavigationControl showCompass={false} />
      {markers}
      {popup && (
        <Popup
          latitude={popup.ListingLocation.lat}
          longitude={popup.ListingLocation.lng}
          closeButton={false}
          offset={[0, -20]}
        >
          {popup.title}
        </Popup>
      )}
    </Map>
  );
}
