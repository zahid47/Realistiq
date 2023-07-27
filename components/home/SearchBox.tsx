"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function SearchBox() {
  const { lang } = useParams();
  return (
    <Link
      href={{
        pathname: `/${lang}/listings`,
      }}
      className={cn(buttonVariants({ variant: "default", size: "lg" }))}
    >
      Browse Listings
    </Link>
  );
}
