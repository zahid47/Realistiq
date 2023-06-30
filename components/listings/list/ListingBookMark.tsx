import { addOrRemoveSaved } from "@/actions/saved-listing";
import { Icons } from "@/components/ui/Icons";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface Props {
  listingId: number;
  isSaved: boolean;
}

export default function ListingBookMark({ listingId, isSaved }: Props) {
  const [loading, setLoading] = useState(false);
  const { status } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  // const page = searchParams.get("page") || 1;
  const queryClient = useQueryClient();

  const handleBookmark = async () => {
    if (status !== "authenticated")
      return router.push(
        `/api/auth/signin?callbackUrl=${pathName}?${searchParams.toString()}`
      );
    setLoading(true);
    await addOrRemoveSaved(listingId);
  };

  const mutation = useMutation({
    mutationFn: handleBookmark,
    onError: () => {
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
    onSuccess: () => {
      // FIXME: adding page to the query key, doesn't refetch the data for some reason
      // queryClient.invalidateQueries({ queryKey: ["listings"] });
      router.refresh();
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <Icons.BookMark
          className="absolute right-2 top-2 cursor-pointer text-slate-500 hover:text-slate-700"
          fill={isSaved ? "currentColor" : "none"}
          onClick={() => {
            mutation.mutate();
          }}
        />
      )}
    </>
  );
}
