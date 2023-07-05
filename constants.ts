export const SUPPORTED_LANGUAGES = ["en", "jp"] as const;
export const SUPPORTED_CURRENCIES = ["USD"] as const;
export const MAPBOX_STYLE = "mapbox://styles/mapbox/streets-v12";
export const DEFAULT_LAT = 39.8097343;
export const DEFAULT_LNG = -98.5556199;
export const DEFAULT_ZOOM = 3.5;
export const MIN_ZOOM = 3.5;
// bounds around the US
export const MAX_BOUNDS = [
  [-146.41806210956798, 1.5155011127359614],
  [-42.22921933613034, 62.603252828479015],
] as const;

// https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
export const PRISMA_ERRORS = new Map([
  ["P2003", { message: "Not Found", statusCode: 404 }],
]);
