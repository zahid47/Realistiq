import "server-only";
import { getUserPlanFromDB } from "@/actions/db-calls/plan";
import { getCurrentUser } from "@/lib/auth";
import stripe from "@/lib/stripe";

const DAY_IN_MS = 86_400_000;

export const checkPlan = async () => {
  const user = await getCurrentUser();
  if (!user)
    return {
      isAgency: false,
      isCanceled: false,
      end: null,
    };

  const userPlan = await getUserPlanFromDB(user.id);

  if (!userPlan)
    return {
      isAgency: false,
      isCanceled: false,
      end: null,
    };

  const isAgency =
    userPlan.stripePriceId &&
    userPlan.stripeCurrentPeriodEnd &&
    userPlan.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();

  let isCanceled = false;
  if (isAgency && userPlan.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      userPlan.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    isAgency: !!isAgency,
    isCanceled: isCanceled,
    end: userPlan.stripeCurrentPeriodEnd,
  };
};
