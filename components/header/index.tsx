import { getCurrentUser } from "@/lib/auth";
import Navbar from "./navbar";

async function Header() {
  const user = await getCurrentUser();
  return <Navbar user={user} />;
}

export default Header;
