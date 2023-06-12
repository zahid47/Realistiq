"use client";

import { type Session } from "next-auth";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { cn } from "@/lib/utils";
import UserNav from "../user-nav";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar({ session }: { session: Session | null }) {
  const scrolled = useScroll(30);
  return (
    <header
      className={cn(
        "z-30 w-full bg-transparent",
        scrolled
          ? "sticky top-0 h-16 border-b backdrop-blur-xl  transition-all duration-300 ease-in-out"
          : "relative h-20"
      )}
    >
      <div className="container h-full">
        <div className="flex h-full  items-center justify-between">
          <Link href="/" className="flex items-center text-2xl font-bold">
            <p>Realistiq</p>
          </Link>
          <div className=" flex items-center gap-x-2">
            {session ? (
              <UserNav session={session} />
            ) : (
              <Button
                variant="ghost"
                onClick={() => {
                  signIn("github");
                }}
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
