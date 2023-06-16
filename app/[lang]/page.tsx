import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <Link className={buttonVariants({ variant: "default" })} href="/listings">
        View listings
      </Link>
    </main>
  );
}
