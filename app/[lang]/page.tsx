import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">
            Stress Free <span className="text-primary">Home</span> Renting
          </h1>
          <h2 className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Find stress-free rental with Realistiq. Explore premium listings,
            connect with trusted landlords, and experience a hassle-free renting
            process.
          </h2>
          <div className="space-x-4">
            <Link
              href="/listings"
              className={cn(buttonVariants({ variant: "default", size: "lg" }))}
            >
              <p className="text-lg">Browse Listings</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
