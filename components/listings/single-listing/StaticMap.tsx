import { MAPBOX_STYLE, MIN_ZOOM } from "@/constants";
import { env } from "@/env.mjs";
import { ExtendedListing } from "@/types/db";
import { Icons } from "@/components/ui/Icons";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, NavigationControl } from "react-map-gl";

interface Props {
  listing: ExtendedListing;
  saved: boolean;
}

export default function StaticMap({ listing, saved }: Props) {
  return (
    <div className="m-auto flex w-2/3 flex-col">
      <div className="h-64 overflow-hidden rounded-lg">
        <Map
          initialViewState={{
            latitude: listing.location.lat,
            longitude: listing.location.lng,
            zoom: 14,
          }}
          mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
          mapStyle={MAPBOX_STYLE}
          dragRotate={false}
          minZoom={MIN_ZOOM}
        >
          <NavigationControl showCompass={false} />
          <Marker
            key={listing.id}
            latitude={listing.location.lat}
            longitude={listing.location.lng}
            anchor="center"
          >
            {saved ? (
              <Icons.BookMark color="#fff" fill="#6d28d9" strokeWidth={3} />
            ) : (
              <Icons.Circle color="#fff" fill="#6d28d9" strokeWidth={3} />
            )}
          </Marker>
        </Map>
      </div>
    </div>
  );
}
