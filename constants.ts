export const supportedLanguages = ["en", "jp"] as const;
export const supportedCurrencies = ["USD"] as const;
// https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
export const prismaErrors = new Map([
  ["P2003", { message: "Not Found", statusCode: 404 }],
]);
