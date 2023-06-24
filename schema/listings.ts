import { z } from "zod";

export const listingsSearchParamsSchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().optional().default(50),
  sort: z
    .object({
      key: z.enum(["id"]),
      direction: z.enum(["asc", "desc"]),
    })
    .optional()
    .default({
      key: "id",
      direction: "desc",
    }),
});
