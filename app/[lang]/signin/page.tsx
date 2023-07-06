import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import SignIn from "@/components/header/SignIn";

export default async function SignInPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return <SignIn />;
}
