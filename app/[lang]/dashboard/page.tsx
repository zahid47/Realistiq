import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { checkPlan } from "@/lib/plan";
import PlanCard from "./_components/PlanCard";
import TestAppAlert from "./_components/TestAppAlert";

interface Props {
  params: {
    lang: string;
  };
}

export default async function Dashboard({ params }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect(`/${params.lang}/`);

  const plan = await checkPlan();

  return (
    <div className="mx-auto flex max-w-2xl flex-col justify-center gap-4">
      <h1 className="mt-4 text-2xl font-bold">Billing</h1>
      <p className="text-gray-500">
        Manage billing and your subscription plan.
      </p>

      <TestAppAlert />

      <PlanCard plan={plan} />
    </div>
  );
}
