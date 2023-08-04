import Link from "next/link";
import { useParams } from "next/navigation";
import type { User } from "next-auth";
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
import { Icons } from "../../../components/ui/Icons";
import PlanBadge from "./PlanBadge";

interface Props {
  user?: User & { id: string };
  isAgency: boolean;
}

export default function UserAvatar({ user, isAgency }: Props) {
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
