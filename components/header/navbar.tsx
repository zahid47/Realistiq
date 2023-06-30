"use client";

import { type Session } from "next-auth";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { cn } from "@/lib/utils";
import UserAvatar from "./user-avatar";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/Icons";
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/lib/hooks/use-toast";

export default function Navbar({ session }: { session: Session | null }) {
  const scrolled = useScroll(30);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      signIn("github");
    } catch {
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: "There was an error while signing in. Please try again.",
        action: (
          <ToastAction altText="Retry" onClick={handleLogin}>
            Retry
          </ToastAction>
        ),
      });
    } finally {
      setLoading(false);
    }
  };

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
              <Button variant="ghost" onClick={handleLogin} isLoading={loading}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
