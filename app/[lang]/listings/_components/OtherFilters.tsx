import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getSearchParamsString } from "@/lib/utils";
import { GetListingsPayload } from "@/lib/validators/listing";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/Icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  searchParams: GetListingsPayload;
}

export default function OtherFilters({ searchParams }: Props) {
  const [pressed, setPressed] = useState(searchParams.saved);
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handlePress = (value: Boolean) => {
    setPressed(value.toString() as "true" | "false");
    const newSearchParams = {
      ...searchParams,
      saved: value,
    };
    const qs = getSearchParamsString(newSearchParams);
    const url = `${pathname}?${qs}`;
    router.push(url);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Icons.Filter className="h-4 w-4" />
          <span className="ml-2 hidden 2xl:block">Filters</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>Filters go here</PopoverContent>
    </Popover>
  );
}
