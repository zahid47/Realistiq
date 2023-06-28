import { supportedCurrencies } from "@/constants";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import { ClassValue, clsx } from "clsx";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { twMerge } from "tailwind-merge";
import { i18n } from "../i18n-config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number,
  currency: (typeof supportedCurrencies)[number]
) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * @description Returns "s" if the count is greater than 1
 */
export function pluralized(countOrItems: number | Array<any>) {
  const count = Array.isArray(countOrItems)
    ? countOrItems.length
    : countOrItems;

  return count > 1 ? "s" : "";
}

export function captitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

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

export const getSearchParamsObject = (searchParams: URLSearchParams) => {
  return Object.fromEntries(searchParams);
};

export const getSearchParamsString = (object: Record<string, any>) => {
  return new URLSearchParams(object).toString();
};

export function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  return matchLocale(languages, locales, i18n.defaultLocale);
}
