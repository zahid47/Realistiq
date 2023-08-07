"use client";

import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";
import useScroll from "@/lib/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/ui/Icons";

interface Props {
  user?: User & { id: string };
  isAgency: boolean;
}

function PlanBadge({ isAgency }: { isAgency: boolean }) {
  return (
    <Badge
      className={cn(
        isAgency && "bg-amber-100 text-amber-600 hover:bg-amber-200"
      )}
      variant="secondary"
    >
      {isAgency ? "Agency" : "Personal"}
    </Badge>
  );
}

function UserAvatar({ user, isAgency }: Props) {
  const { lang } = useParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.image as string}
              alt={user?.name as string}
            />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <PlanBadge isAgency={isAgency} />
            </div>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/${lang}/dashboard`}>
            <Icons.User className="mr-2 h-4 w-4" />
            <span>Dashborad</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="sm:hidden">
          <Link href={`/${lang}/create-listing`}>
            <Icons.Add className="mr-2 h-4 w-4" />
            <span>List your property</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <Icons.LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Navbar({ user, isAgency }: Props) {
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
              <UserAvatar user={user} isAgency={isAgency} />
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
