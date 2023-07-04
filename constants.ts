export const SUPPORTED_LANGUAGES = ["en", "jp"] as const;
export const SUPPORTED_CURRENCIES = ["USD"] as const;
export const MAPBOX_STYLE = "mapbox://styles/mapbox/streets-v12";
export const DEFAULT_LAT = 39.8097343;
export const DEFAULT_LNG = -98.5556199;
export const DEFAULT_ZOOM = 3.5;

// https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
export const PRISMA_ERRORS = new Map([
  ["P2003", { message: "Not Found", statusCode: 404 }],
]);
