import { addOrRemoveSaved } from "@/actions/api-calls/saved-listing";
import { Icons } from "@/components/ui/Icons";
import { toast } from "@/lib/hooks/use-toast";
import { getSearchParamsObject } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  listingId: number;
  isSaved: boolean;
}

export default function ListingBookMark({ listingId, isSaved }: Props) {
  const [saved, setSaved] = useState(isSaved);
  const { status } = useSession();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleBookmark = async () => {
    if (status !== "authenticated")
      return router.push(
        `/api/auth/signin?callbackUrl=${pathName}?${searchParams.toString()}`
      );

    await addOrRemoveSaved(listingId);
  };

  const mutation = useMutation({
    mutationFn: handleBookmark,
    onMutate: () => {
      setSaved((prev) => !prev);
    },
    onError: () => {
      setSaved((prev) => !prev);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Could not ${isSaved && "un"}save the listing.`,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      router.refresh();
    },
  });

  return (
    <Icons.BookMark
      className="absolute right-2 top-2 cursor-pointer text-slate-500 hover:text-slate-700"
      fill={saved ? "currentColor" : "none"}
      onClick={() => {
        mutation.mutate();
      }}
    />
  );
}
