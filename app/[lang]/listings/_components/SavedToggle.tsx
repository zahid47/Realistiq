import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getSearchParamsString } from "@/lib/utils";
import { GetListingsPayload } from "@/lib/validators/listing";
import { Icons } from "@/components/ui/Icons";
import { Toggle } from "@/components/ui/toggle";

interface Props {
  searchParams: GetListingsPayload;
}

export default function SavedToggle({ searchParams }: Props) {
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
    <div
      title={
        status !== "authenticated"
          ? "You need to be signed in to view your saved listings"
          : ""
      }
    >
      <Toggle
        variant="outline"
        aria-label="Toggle saved-only"
        onPressedChange={handlePress}
        pressed={pressed === "true"}
        disabled={status !== "authenticated"}
      >
        <Icons.BookMark className="h-4 w-4" />
        <span className="ml-2 hidden 2xl:block">My Saved listings</span>
      </Toggle>
    </div>
  );
}
