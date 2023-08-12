import { NextResponse, type NextRequest } from "next/server";
import { PRISMA_ERRORS } from "@/constants";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatPrice = (price: number, currency: string) => {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price);
};

/**
 * @description Returns "s" if the count is greater than 1
 */
export const pluralized = (countOrItems: number | Array<any>) => {
  const count = Array.isArray(countOrItems)
    ? countOrItems.length
    : countOrItems;

  return count > 1 ? "s" : "";
};

export const getRGBDataURL = (r: number, g: number, b: number) => {
  const keyStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);

  return `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
};

export const getSearchParamsString = (object: Record<string, any>) => {
  return new URLSearchParams(object).toString();
};

export const sendNextError = (err: any) => {
  const isZodError = err instanceof ZodError;
  const isPrismaError = err.code && PRISMA_ERRORS.has(err.code);

  const status = isZodError
    ? 422
    : isPrismaError
    ? PRISMA_ERRORS.get(err.code)?.statusCode
    : 500;

  const message = isZodError
    ? "Unprocessable Entity"
    : isPrismaError
    ? PRISMA_ERRORS.get(err.code)?.message
    : err;

  return NextResponse.json({ error: message }, { status });
};

export const getRequestBodyGracefully = async (request: NextRequest) => {
  let body = {};
  try {
    body = await request.json();
  } catch {}
  return body;
};
