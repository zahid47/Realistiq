import { z } from "zod";

export const listingsSearchParamsSchema = z.object({
  page: z.coerce.number().int().positive().catch(1),
  limit: z.coerce.number().int().positive().optional(),
  sort_by: z.enum(["id"]).catch("id"),
  sort_order: z.enum(["asc", "desc"]).catch("desc"),
});
