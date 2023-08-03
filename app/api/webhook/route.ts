import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import stripe from "@/lib/stripe";
import { sendNextError } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = headers().get("Stripe-Signature") as string;

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    const session = event.data.object as Stripe.Checkout.Session;

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // new subscription created
    if (event.type === "checkout.session.completed") {
      const user_id = session.metadata?.user_id;

      if (!user_id) {
        return new NextResponse("No user id found in metadata", {
          status: 400,
        });
      }

      await db.plan.create({
        data: {
          user_id,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id as string,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });
    }

    // subscription updated
    if (event.type === "invoice.payment_succeeded") {
      await db.plan.update({
        where: {
          stripeSubscriptionId: subscription.id,
        },
        data: {
          stripePriceId: subscription.items.data[0].price.id as string,
          stripeCurrentPeriodEnd: new Date(
            subscription.current_period_end * 1000
          ),
        },
      });
    }

    return new NextResponse("Webhook received", { status: 200 });
  } catch (err) {
    return sendNextError(err);
  }
}
