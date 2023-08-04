import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import SignIn from "./_components/SignIn";

export default async function SignInPage() {
  const user = await getCurrentUser();
  if (user) redirect("/");

  return <SignIn />;
}
