"use client";

import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import type { User } from "next-auth";
import useScroll from "@/lib/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/Icons";
import UserAvatar from "./user-avatar";

interface Props {
  user?: User & { id: string };
}

export default function Navbar({ user }: Props) {
  const scrolled = useScroll(30);
  const { lang } = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const callbackUrl = `${pathname}?${searchParams.toString()}`;

  const isHomePage = pathname === `/${lang}`;

  return (
    <header
      className={cn(
        "z-30 h-16 w-full bg-transparent backdrop-blur-xl transition-all duration-300 ease-in-out",
        scrolled ? "sticky top-0 border-b" : "relative"
      )}
    >
      <div className="container h-full">
        <div className="flex h-full items-center justify-between">
          <Link href={`/${lang}`} className="flex items-center">
            <Icons.logo
              className="h-6"
              color={isHomePage ? "white" : "#6D28D9"}
            />
          </Link>
          <div className="flex items-center gap-x-4">
            <Link
              href={{
                pathname: user ? `/${lang}/create-listing` : `/${lang}/signin`,
                query: !user ? { callbackUrl: "/create-listing" } : {},
              }}
            >
              <span
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "hidden sm:block",
                  isHomePage && "text-white",
                  "font-semibold"
                )}
              >
                List your property
              </span>
            </Link>
            {user ? (
              <UserAvatar user={user} />
            ) : (
              <Link
                href={{
                  pathname: `/${lang}/signin`,
                  query: { callbackUrl },
                }}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "hidden sm:block",
                  isHomePage && "text-white",
                  "font-semibold"
                )}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
