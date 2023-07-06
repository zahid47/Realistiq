import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import SignIn from "@/components/header/SignIn";
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
