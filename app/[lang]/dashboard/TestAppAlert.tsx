"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "@/components/ui/Icons";

export default function TestAppAlert() {
  return (
    <Alert className="!pl-14">
      <Icons.Warning />
      <AlertTitle>This is a demo app.</AlertTitle>
      <AlertDescription>
        Realistiq is a demo app using a Stripe test environment. You can find a
        list of test card numbers on the{" "}
        <a
          href="https://stripe.com/docs/testing#cards"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-8"
        >
          Stripe docs
        </a>
        .
      </AlertDescription>
    </Alert>
  );
}
