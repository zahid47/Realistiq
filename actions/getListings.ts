import { env } from "@/env.mjs";
// import { db } from "@/lib/db";

// export default async function getListings() {
//   const listings = await db.listing.findMany({
//     include: {
//       user: true,
//     },
//   });

//   return listings;
// }

export default async function getListings() {
  return await fetch(`${env.NEXT_PUBLIC_APP_URL}/api/listings`).then((response) => response.json());
}
