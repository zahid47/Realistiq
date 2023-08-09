import type { FillLayer, GeoJSONSourceRaw, LineLayer } from "react-map-gl";
import MAP_STYLE from "../data/map-style-realistiq.json";
import statesData from "../data/us-states.json";

const usStates: GeoJSONSourceRaw = {
  type: "geojson",
  //@ts-ignore
  data: statesData,
};

const fillLayer: FillLayer = {
  id: "us-states-fill",
  source: "us-states",
  type: "fill",
  paint: {
    "fill-color": "#fbbf24",
    "fill-opacity": 0.07,
  },
};

const lineLayer: LineLayer = {
  id: "us-states-outline",
  source: "us-states",
  type: "line",
  paint: {
    "line-width": 2,
    "line-color": "#6d28d9",
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...MAP_STYLE,
  sources: {
    ...MAP_STYLE.sources,
    ["us-states"]: usStates,
  },
  layers: [...MAP_STYLE.layers, fillLayer, lineLayer],
};
