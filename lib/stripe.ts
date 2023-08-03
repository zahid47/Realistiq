import { env } from "@/env.mjs";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_API_KEY, {
  apiVersion: "2022-11-15",
  typescript: true,
});

export default stripe;
