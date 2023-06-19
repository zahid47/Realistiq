"use client";

import { Dispatch, SetStateAction, useMemo, useState, useRef } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { env } from "@/env.mjs";
import { cn } from "@/lib/utils";
import type { MapRef } from "react-map-gl";

const MAPBOX_TOKEN = env.NEXT_PUBLIC_MAPBOX_TOKEN;
const MAPBOX_STYLE = "mapbox://styles/mapbox/streets-v12";

interface Props {
  listings: any;
  setClickedListingId: Dispatch<SetStateAction<null | number>>;
  hoveringListingId: null | number;
}

export default function ListingsMap({
  listings,
  setClickedListingId,
  hoveringListingId,
}: Props) {
  const mapRef = useRef<MapRef>(null);

  const [viewState, setViewState] = useState({
    longitude: -82.5324,
    latitude: 39.71375,
    zoom: 3,
  });

  const markers = useMemo(
    () =>
      listings &&
      listings.map((listing: any) => (
        <Marker
          key={listing.id}
          latitude={listing.ListingLocation.lat}
          longitude={-listing.ListingLocation.lng}
          anchor="bottom"
        >
          <button
            onClick={() => {
              setClickedListingId(listing.id);
            }}
            className={cn(
              ` rounded-full border-2 border-white transition-all duration-100 ease-in-out`,
              hoveringListingId === listing.id
                ? `h-5 w-5 bg-amber-400`
                : `h-4 w-4 bg-deep-purple-600`
            )}
          />
        </Marker>
      )),
    [hoveringListingId, listings, setClickedListingId]
  );

  return (
    <Map
      {...viewState}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle={MAPBOX_STYLE}
      ref={mapRef}
      onMove={(e) => setViewState(e.viewState)}
      dragRotate={false}
    >
      {markers}
    </Map>
  );
}
