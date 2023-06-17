"use client";

import { useState } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { env } from "@/env.mjs";

const MAPBOX_TOKEN = env.NEXT_PUBLIC_MAPBOX_TOKEN;
const MAPBOX_STYLE = "mapbox://styles/mapbox/navigation-day-v1";

export default function ListingsMap({ listings }: any) {
  const [viewState, setViewState] = useState({
    longitude: -82.5324,
    latitude: 39.71375,
    zoom: 3,
  });

  if (!listings) return null;

  return (
    <Map
      {...viewState}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle={MAPBOX_STYLE}
      onMove={(e) => setViewState(e.viewState)}
    >
      {listings.map((listing: any) => (
        <Marker
          key={listing.id}
          latitude={listing.ListingLocation.lat}
          longitude={-listing.ListingLocation.lng}
          anchor="bottom"
        >
          <button className="h-3 w-3 rounded-full border-2 border-white bg-violet-700" />
        </Marker>
      ))}
    </Map>
  );
}
