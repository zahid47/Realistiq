"use client";

import { env } from "@/env.mjs";
import { QueryObserverSuccessResult } from "@tanstack/react-query";
import "mapbox-gl/dist/mapbox-gl.css";
import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import { ReturnData } from "@/actions/api-calls/listing";
import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ZOOM } from "@/constants";
import { useLocalStorage } from "@mantine/hooks";
import type { MapRef } from "react-map-gl";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl";
import { ExtendedListing } from "@/types/db";
import ListingsMapSkeleton from "../../skeletons/ListingsMapSkeleton";
import MarkerIcon from "./MarkerIcon";

const MAPBOX_TOKEN = env.NEXT_PUBLIC_MAPBOX_TOKEN;
const MAPBOX_STYLE = "mapbox://styles/mapbox/streets-v12";

interface Props {
  listingsQueryResult: QueryObserverSuccessResult<ReturnData, unknown>;
  setClickedListingId: Dispatch<SetStateAction<null | number>>;
  hoveringListingId: null | number;
  popup: ExtendedListing | null;
  setPopup: Dispatch<SetStateAction<null | ExtendedListing>>;
}

export default function ListingsMap({
  listingsQueryResult,
  setClickedListingId,
  hoveringListingId,
  popup,
  setPopup,
}: Props) {
  const listings = listingsQueryResult.data.listings;
  const mapRef = useRef<MapRef>(null);

  const [viewState, setViewState] = useLocalStorage({
    key: "viewState",
    defaultValue: {
      latitude: DEFAULT_LAT,
      longitude: DEFAULT_LNG,
      zoom: DEFAULT_ZOOM,
    },
  });

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
