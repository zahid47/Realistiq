import { supportedCurrencies } from "@/constants";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
