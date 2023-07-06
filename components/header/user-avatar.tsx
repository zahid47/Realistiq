import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "../ui/Icons";

interface Props {
  user?: Session["user"];
}

const menuLinks = [
  {
    label: "Account",
    href: "/account",
    icon: <Icons.User className="mr-2 h-4 w-4" />,
  },
  {
    label: "My Listings",
    href: "/my-listings",
    icon: <Icons.Home className="mr-2 h-4 w-4" />,
  },
];

export default function UserAvatar({ user }: Props) {
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
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuLinks.map((link) => (
          <DropdownMenuItem key={link.href} disabled>
            {link.icon}
            <span>{link.label}</span> <i>(soon)</i>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={() => signOut()}>
          <Icons.LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
