import { getCurrentUser } from "@/lib/auth";
import { checkPlan } from "@/lib/plan";
import Navbar from "@/components/shared/Navbar";

async function Header() {
  const user = await getCurrentUser();
  const { isAgency } = await checkPlan();
  return <Navbar user={user} isAgency={isAgency} />;
}

export default Header;
