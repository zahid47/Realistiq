import { redirect } from "next/navigation";
import SignIn from "@/app/[lang]/signin/_components/SignIn";
import { getCurrentUser } from "@/lib/auth";
import InterceptedDialog from "@/components/ui/intercepted-dialog";

export default async function page() {
  const user = await getCurrentUser();
  if (user) redirect("/");
  return (
    <InterceptedDialog title="Sign In">
      <SignIn />
    </InterceptedDialog>
  );
}
