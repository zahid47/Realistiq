import SignIn from "@/components/header/SignIn";
import InterceptedDialog from "@/components/ui/intercepted-dialog";

export default function page() {
  return (
    <InterceptedDialog title="Sign In">
      <SignIn />
    </InterceptedDialog>
  );
}
