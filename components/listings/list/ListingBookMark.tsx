import { addOrRemoveSaved } from "@/actions/api-calls/saved-listing";
import { Icons } from "@/components/ui/Icons";
import { Button } from "@/components/ui/button";
import { toast } from "@/lib/hooks/use-toast";
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
    <Button
      size="icon"
      variant="link"
      className="absolute right-2 top-2 bg-black bg-opacity-50 hover:bg-opacity-100"
      onClick={(e) => {
        mutation.mutate();
        e.stopPropagation();
      }}
    >
      <Icons.BookMark
        className="text-white"
        fill={saved ? "currentColor" : "none"}
        size={20}
      />
    </Button>
  );
}
