import { z } from "zod";

export const boundsSchema = z.array(z.array(z.coerce.number()).length(2));

export const getListingsPayload = z.object({
  page: z.coerce.number().int().positive().catch(1),
  limit: z.coerce.number().int().positive().optional(),
  sort: z
    .enum([
      "Recommended",
      "Latest",
      "Cheapest",
      "Most expensive",
      "Largest",
      "Smallest",
    ])
    .catch("Recommended"),
  zoom: z.coerce.number().positive().optional(),
  bounds: z.string().optional(),
});

export const createListingSchema = z.object({
  address: z.string().nonempty().max(1000),
  latitude: z.number(),
  longitude: z.number(),

  beds: z.number().int().positive(),
  baths: z.number().int().positive(),
  floor_area: z.number().int().positive(),

  description: z.string().nonempty().max(10000),

  photos: z.array(z.string().nonempty().max(1000)).length(20),

  // photos: z
  //   .array(
  //     z.object({
  //       url: z.string().nonempty().max(1000),
  //       alt: z.string().nonempty().max(1000).optional(),
  //     })
  //   )
  //   .length(20),

  price: z.number().int().positive(),
});

export type GetListingsPayload = z.infer<typeof getListingsPayload>;
export type Bounds = z.infer<typeof boundsSchema>;
export type CreateListingSchema = z.infer<typeof createListingSchema>;
