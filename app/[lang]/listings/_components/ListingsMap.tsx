"use client";

import { ReturnData } from "@/actions/api-calls/listing";
import { DEFAULT_LAT, DEFAULT_LNG, DEFAULT_ZOOM, MIN_ZOOM } from "@/constants";
import { env } from "@/env.mjs";
import { QueryObserverSuccessResult } from "@tanstack/react-query";
import bbox from "@turf/bbox";
import { ExtendedListing } from "@/types/db";
import MAP_STYLE from "@/lib/map-style-with-overlay";
import { getSearchParamsString } from "@/lib/utils";
import type { Bounds, GetListingsPayload } from "@/lib/validators/listing";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type {
  MapboxStyle,
  MapLayerMouseEvent,
  MapRef,
  ViewState,
} from "react-map-gl";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl";
import ListingsMapSkeleton from "./ListingsMapSkeleton";
import MarkerIcon from "./MarkerIcon";
import PopupInfo from "./PopupInfo";

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
  const zoom = searchParams.zoom ? searchParams.zoom : DEFAULT_ZOOM;
  const bounds =
    searchParams.bounds && (JSON.parse(searchParams.bounds) as Bounds);

  const [isDragging, setIsDragging] = useState(false); // when we are dragging we disable the popup for performance reasons
  const mapRef = useRef<MapRef>(null);
  const router = useRouter();
  const pathname = usePathname();

  // this calculation is not 100% accurate
  // I think it's because of division being not precise
  // but it's good enough for now
  // TODO: improve this?
  const { latitude, longitude } = useMemo(() => {
    if (bounds) {
      const [neLng, neLat] = bounds[1];
      const [swLng, swLat] = bounds[0];

      const latitude = (neLat + swLat) / 2;
      const longitude = (neLng + swLng) / 2;

      return { latitude, longitude };
    }
    return { latitude: DEFAULT_LAT, longitude: DEFAULT_LNG };
  }, [bounds]);

  const [viewState, setViewState] = useState<Partial<ViewState>>({
    latitude,
    longitude,
    zoom,
  });

  const addBoundsToUrl = useCallback(
    (bounds: Bounds) => {
      const newSearchParams = {
        ...searchParams,
        bounds: JSON.stringify(bounds),
        zoom: viewState.zoom,
        page: 1, // reset page to 1 when bounds change to avoid showing empty page
      };
      const qs = getSearchParamsString(newSearchParams);
      const url = `${pathname}?${qs}`;
      router.push(url);
    },
    [pathname, router, searchParams, viewState.zoom]
  );

  const zoomToBounds = useCallback((e: MapLayerMouseEvent) => {
    // @ts-ignore
    const feature = e.features[0];
    if (feature) {
      // calculate the bounding box of the feature
      const [minLng, minLat, maxLng, maxLat] = bbox(feature);

      mapRef.current?.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 40, duration: 1000 }
      );
    }
  }, []);

  const markers = useMemo(
    () =>
      listings.map((listing: ExtendedListing) => (
        <Marker
          key={listing.id}
          latitude={listing.location.lat}
          longitude={listing.location.lng}
          anchor="center"
        >
          <MarkerIcon
            onClick={() => {
              setClickedListingId(listing.id);
            }}
            // FIXME: we are changing the popup on hover, but this causes the map to re-render, this causes huge performance hits.
            onMouseEnter={() => {
              if (!isDragging) setPopup(listing);
            }}
            onMouseLeave={() => {
              setPopup(null);
            }}
            isHovering={hoveringListingId === listing.id}
            isSaved={!!listing.saved.length}
          />
        </Marker>
      )),
    [hoveringListingId, isDragging, listings, setClickedListingId, setPopup]
  );

  if (listingsQueryResult.isLoading) return <ListingsMapSkeleton />;

  return (
    <Map
      {...viewState}
      mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
      ref={mapRef}
      mapStyle={MAP_STYLE as unknown as MapboxStyle}
      onClick={zoomToBounds}
      interactiveLayerIds={["us-states-fill"]}
      onMoveStart={() => {
        setIsDragging(true);
      }}
      onMove={(e) => setViewState(e.viewState)}
      onMoveEnd={() => {
        if (mapRef.current) {
          const bounds = mapRef.current.getMap().getBounds().toArray();
          addBoundsToUrl(bounds);
        }
        setIsDragging(false);
      }}
      dragRotate={false}
      minZoom={MIN_ZOOM}
    >
      <NavigationControl showCompass={false} />
      {markers}
      {popup && (
        <Popup
          latitude={popup.location.lat}
          longitude={popup.location.lng}
          closeButton={false}
          maxWidth="300px"
          offset={10}
        >
          <PopupInfo popup={popup} />
        </Popup>
      )}
    </Map>
  );
}
