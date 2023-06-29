import { saveOrRemoveListing } from "@/actions/saved-listing";
import { Icons } from "@/components/ui/Icons";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  listingId: number;
  isSaved: boolean;
}

export default function ListingBookMark({ listingId, isSaved }: Props) {
  const [saved, setSaved] = useState(isSaved);
  const { status } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  // const page = searchParams.get("page") || 1;
  const queryClient = useQueryClient();

  // FIXME: need to sync with after tanstack query has fetched the latest data, because in the server fetch, auth is not working, so the data is not accurate. really don't like this fml
  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleBookMark = async () => {
    if (status !== "authenticated")
      return router.push(
        `/api/auth/signin?callbackUrl=${pathName}?${searchParams.toString()}`
      );

    await saveOrRemoveListing(listingId);
  };

  const mutation = useMutation({
    mutationFn: handleBookMark,
    onMutate: async () => {
      setSaved((prev) => !prev);
    },
    onError: () => {
      setSaved((prev) => !prev);
      const description = isSaved
        ? "Failed to remove."
        : "Could not save the listing.";
      toast({
        variant: "destructive",
        title: "Error",
        description: description + " Please try again.",
        action: (
          <ToastAction
            altText="Retry"
            onClick={() => {
              mutation.mutate();
            }}
          >
            Retry
          </ToastAction>
        ),
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] }); // FIXME: adding page to the query key, doesn't refetch the data for some reason
    },
  });

  return (
    <Icons.BookMark
      className="absolute right-2 top-2 w-[2.5rem] cursor-pointer text-slate-500 hover:text-slate-700"
      fill={saved ? "currentColor" : "none"}
      onClick={() => {
        mutation.mutate();
      }}
    />
  );
}
