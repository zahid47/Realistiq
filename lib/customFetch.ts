import { env } from "@/env.mjs";
import { getSearchParamsString } from "./utils";

const parseRelativePath = (relativePath: string) => {
  // if path starts with /api/ remove it
  if (relativePath.startsWith("/api/")) {
    relativePath = relativePath.slice(5);
  }
  // if path starts with / remove it
  if (relativePath.startsWith("/")) {
    relativePath = relativePath.slice(1);
  }
  // if path ends with / remove it
  if (relativePath.endsWith("/")) {
    relativePath = relativePath.slice(0, -1);
  }
  return relativePath;
};

export const get = async (relativePath: string, payload?: any) => {
  const parsedRelativePath = parseRelativePath(relativePath);
  const query = getSearchParamsString(payload);
  const url = new URL(
    `${env.NEXT_PUBLIC_APP_URL}/api/${parsedRelativePath}?${query}`
  );
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
};

export const post = async (relativePath: string, body: any) => {
  const parsedRelativePath = parseRelativePath(relativePath);
  const url = new URL(`${env.NEXT_PUBLIC_APP_URL}/api/${parsedRelativePath}`);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return await res.json();
};
