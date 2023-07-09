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

export type GetListingsPayload = z.infer<typeof getListingsPayload>;
export type Bounds = z.infer<typeof boundsSchema>;
