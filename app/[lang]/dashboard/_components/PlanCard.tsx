import Link from "next/link";
import { checkPlan } from "@/lib/plan";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

interface Props {
  plan: Awaited<ReturnType<typeof checkPlan>>;
}

export default function PlanCard({ plan }: Props) {
  const description = plan.isAgency
    ? "You can list unlimited properties."
    : "You can only list 1 property.";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Plan</CardTitle>
        <CardDescription>
          You are currently on the{" "}
          <strong>{plan.isAgency ? "Agency" : "Personal"}</strong> plan.{" "}
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
        <Link href="/api/billing" className={buttonVariants()}>
          {plan.isAgency ? "Manage your plan" : "Upgrade to Agency"}
        </Link>
        {plan.isAgency ? (
          <p className="rounded-full text-xs font-medium">
            {plan.isCanceled
              ? "Your plan will be canceled on "
              : "Your plan renews on "}
            {formatDate(plan.end!)}.
          </p>
        ) : null}
      </CardFooter>
    </Card>
  );
}
