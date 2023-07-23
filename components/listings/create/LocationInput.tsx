import {
  DEFAULT_LAT,
  DEFAULT_LNG,
  MAPBOX_STYLE,
  MAX_BOUNDS,
} from "@/constants";
import { env } from "@/env.mjs";
import type { SearchBoxRetrieveResponse } from "@mapbox/search-js-core";
import { SearchBox } from "@mapbox/search-js-react";
import { CreateListingSchema } from "@/lib/validators/listing";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/Icons";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import Map, { Marker, NavigationControl } from "react-map-gl";

type Props = {
  form: UseFormReturn<CreateListingSchema, any, undefined>;
};

export default function LocationInput({ form }: Props) {
  const setAddress = (result: SearchBoxRetrieveResponse) => {
    form.setValue("address", result.features[0].properties.place_formatted);
    form.setValue(
      "latitude",
      result.features[0].properties.coordinates.latitude
    );
    form.setValue(
      "longitude",
      result.features[0].properties.coordinates.longitude
    );
  };

  const coords = form.watch(["latitude", "longitude"]);
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map>();

  return (
    <div>
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormDescription>
              Once published, you will not be able to modify the address.
            </FormDescription>
            <FormControl>
              <SearchBox
                accessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
                placeholder="2750 Karen Street"
                options={{
                  limit: 5,
                  country: "us",
                  types: "address",
                }}
                theme={{
                  variables: {
                    boxShadow: "none",
                    borderRadius: "0.375rem",
                    border: "1px solid #e2e8f0",
                  },
                }}
                value={field.value || ""}
                onRetrieve={setAddress}
                map={mapInstance}
              />
            </FormControl>
            <FormMessage />

            <div className="m-auto h-96 overflow-hidden rounded-lg">
              <Map
                initialViewState={{
                  latitude: DEFAULT_LAT,
                  longitude: DEFAULT_LNG,
                  zoom: 4,
                }}
                onLoad={(e) => {
                  setMapInstance(e.target);
                }}
                mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapStyle={MAPBOX_STYLE}
                dragRotate={false}
                maxBounds={MAX_BOUNDS}
              >
                <NavigationControl showCompass={false} />

                {coords[0] && coords[1] && (
                  <Marker
                    latitude={coords[0]}
                    longitude={coords[1]}
                    anchor="center"
                  >
                    <div className="animate-ping">
                      <Icons.Circle
                        color="#fff"
                        fill="#6d28d9"
                        size={20}
                        strokeWidth={3}
                      />
                    </div>
                  </Marker>
                )}
              </Map>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
