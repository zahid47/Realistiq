import { z } from "zod";

export const getListingsPayload = z.object({
  page: z.coerce.number().int().positive().catch(1),
  limit: z.coerce.number().int().positive().optional(),
  sort_by: z.enum(["id"]).catch("id"),
  sort_order: z.enum(["asc", "desc"]).catch("desc"),
  bounds: z.array(z.array(z.coerce.number()).length(2)).optional(),
});

export type GetListingsPayload = z.infer<typeof getListingsPayload>;
