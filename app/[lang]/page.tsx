import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
      <Link className={buttonVariants({ variant: "default" })} href="/listings">
        View listings
      </Link>
    </main>
  );
}
