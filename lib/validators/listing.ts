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
  address: z.string({
    required_error: "Please search for an address and select one from the list",
  }),
  latitude: z.number(),
  longitude: z.number(),
  beds: z.coerce.number().int().positive(),
  baths: z.coerce.number().int().positive(),
  floor_area: z.coerce
    .number({
      invalid_type_error: "How big is the place?",
    })
    .int({ message: "Floor area must be a whole number" })
    .positive({ message: "How big is the place?" }),
  description: z.string({
    required_error: "Please describe the place, tell us how cool it is!",
  }),
  photos: z
    .array(
      z.object({
        src: z.string().nonempty().max(1000),
      }),
      { required_error: "Hey, upload at least 1 photo!" }
    )
    .min(1, { message: "Hey, upload at least 1 photo!" })
    .max(20, { message: "You can upload maximum 20 photos" }),
  amount: z.coerce
    .number({
      invalid_type_error: "Rent can't be free!",
    })
    .positive({
      message: "Rent can't be free!",
    }),
  interval: z.string(),
});

export type GetListingsPayload = z.infer<typeof getListingsPayload>;
export type Bounds = z.infer<typeof boundsSchema>;
export type CreateListingSchema = z.infer<typeof createListingSchema>;
