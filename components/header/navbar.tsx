"use client";

import Link from "next/link";
import { type Session } from "next-auth";
import useScroll from "@/lib/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/ui/Icons";
import UserAvatar from "./user-avatar";

export default function Navbar({ session }: { session: Session | null }) {
  const scrolled = useScroll(30);

  return (
    <header
      className={cn(
        "z-30 h-16 w-full bg-transparent",
        scrolled
          ? "sticky top-0 border-b backdrop-blur-xl transition-all duration-300 ease-in-out"
          : "relative"
      )}
    >
      <div className="container h-full">
        <div className="flex h-full items-center justify-between">
          <Link href="/" className="flex items-center">
            <Icons.logo className="h-6" />
          </Link>
          <div className=" flex items-center gap-x-2">
            {session ? (
              <UserAvatar session={session} />
            ) : (
              <Link
                href="/signin"
                className={cn(buttonVariants({ variant: "ghost" }))}
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
