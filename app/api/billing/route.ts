import { NextResponse } from "next/server";
import { getUserPlanFromDB } from "@/actions/db-calls/plan";
import { env } from "@/env.mjs";
import { getCurrentUser } from "@/lib/auth";
import stripe from "@/lib/stripe";
import { sendNextError } from "@/lib/utils";

const getAbsoluteURL = (relativePath: string) => {
  // if path starts with / remove it
  if (relativePath.startsWith("/")) {
    relativePath = relativePath.slice(1);
  }
  // if path ends with / remove it
  if (relativePath.endsWith("/")) {
    relativePath = relativePath.slice(0, -1);
  }

  return `${env.NEXT_PUBLIC_APP_URL}/${relativePath}`;
};

const dashboardUrl = getAbsoluteURL("dashboard");

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userPlan = await getUserPlanFromDB(user.id);

    // user already has a plan, and want's to manage it
    if (userPlan && userPlan.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userPlan.stripeCustomerId,
        return_url: dashboardUrl,
      });

      return NextResponse.redirect(stripeSession.url, { status: 303 });
    }

    // user doesn't have a plan, and want's to subscribe for the first time
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      success_url: dashboardUrl,
      cancel_url: dashboardUrl,
      billing_address_collection: "auto",
      customer_email: user.email!,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Realistiq Agency",
              description: "Realistiq Agency Plan",
            },
            unit_amount: 999,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        user_id: user.id,
      },
    });

    return NextResponse.redirect(stripeSession.url!, { status: 303 });
  } catch (err) {
    return sendNextError(err);
  }
}
