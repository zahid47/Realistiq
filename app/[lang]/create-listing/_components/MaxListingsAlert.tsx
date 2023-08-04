"use client";

import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Icons } from "@/components/ui/Icons";

export default function MaxListingsAlert() {
  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-2xl items-center">
      <Alert className="!pl-14">
        <Icons.Warning />
        <AlertTitle>
          You have reached the maximum number of listings allowed for your plan.
        </AlertTitle>
        <AlertDescription>
          Please delete a listing or{" "}
          <Link
            href="/api/billing"
            className="font-medium underline underline-offset-8"
          >
            upgrade
          </Link>{" "}
          to the Agency plan to create more listings.
        </AlertDescription>
      </Alert>
    </div>
  );
}
