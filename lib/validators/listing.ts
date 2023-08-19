import { z } from "zod";

export const boundsSchema = z.array(z.array(z.coerce.number()).length(2));

export const getListingsPayload = z.object({
  owner_id: z.string().optional(),
  page: z.coerce.number().int().positive().catch(1),
  limit: z.coerce.number().int().positive().optional(),
  sort: z
    .enum(["Latest", "Cheapest", "Most expensive", "Largest", "Smallest"])
    .catch("Latest"),
  zoom: z.coerce.number().positive().optional(),
  bounds: z.string().optional(),
  saved: z.enum(["true", "false"]).catch("false"),
  min_beds: z.coerce.number().int().positive().optional(),
  max_beds: z.coerce.number().int().positive().optional(),
  min_baths: z.coerce.number().int().positive().optional(),
  max_baths: z.coerce.number().int().positive().optional(),
  min_floor_area: z.coerce.number().int().positive().optional(),
  max_floor_area: z.coerce.number().int().positive().optional(),
  max_rent: z.coerce
    .number()
    .int()
    .positive()
    .optional()
    .or(z.literal(""))
    .catch(""),
});

export const createListingSchema = z.object({
  address: z
    .string({
      required_error:
        "Please search for an address and select one from the list.",
    })
    .nonempty({
      message: "Please search for an address and select one from the list.",
    }),
  latitude: z.number(),
  longitude: z.number(),
  beds: z.coerce.number().int().positive(),
  baths: z.coerce.number().int().positive(),
  floor_area: z.coerce
    .number({
      invalid_type_error: "Please enter a valid floor area.",
    })
    .int({ message: "Floor area must be a whole number." })
    .positive({ message: "Please enter a valid floor area." }),
  description: z
    .string({
      required_error: "Please describe the place, tell us how cool it is!",
    })
    .nonempty({
      message: "Please describe the place, tell us how cool it is!",
    }),

  photos: z
    .array(z.string().nonempty(), {
      required_error: "Please upload at least 2 photos!",
    })
    .min(2, { message: "Please upload at least 2 photos!" })
    .max(20, { message: "You can upload maximum 20 photos." }),

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
