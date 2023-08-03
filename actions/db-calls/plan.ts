// GET ONLY, NO MUTATIONS

import "server-only";
import { db } from "@/lib/db";

export const getUserPlanFromDB = async (user_id: string) => {
  return await db.plan.findUnique({
    select: {
      stripeCustomerId: true,
      stripeSubscriptionId: true,
      stripePriceId: true,
      stripeCurrentPeriodEnd: true,
    },
    where: { user_id },
  });
};
