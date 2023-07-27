import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { addOrRemoveSaved } from "@/actions/api-calls/saved-listing";
import { env } from "@/env.mjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Bookmark, Share2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { ExtendedListing } from "@/types/db";
import { toast } from "@/lib/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface Props {
  listing: ExtendedListing;
  saved: boolean;
  setSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BookmarkShare({ listing, saved, setSaved }: Props) {
  const { lang } = useParams();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { status } = useSession();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => addOrRemoveSaved(listing.id),
    onMutate: () => {
      setSaved((prev) => !prev);
    },
    onError: () => {
      setSaved((prev) => !prev);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Could not ${saved && "un"}save the listing.`,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["listings", listing.uuid] });
      router.refresh();
    },
  });

  return (
    <div className="flex gap-2">
      <Button
        onClick={(e) => {
          if (status !== "authenticated") {
            const callbackUrl = encodeURIComponent(
              `${pathName}?${searchParams.toString()}`
            );
            const url = `/${lang}/signin?callbackUrl=${callbackUrl}`;
            return router.push(url);
          }
          mutation.mutate();
          e.stopPropagation();
        }}
        size="sm"
        variant="secondary"
      >
        <Bookmark
          className="mr-2 h-4 w-4"
          fill={saved ? "grey" : "#00000000"}
        />{" "}
        {saved ? "Remove bookmark" : "Add bookmark"}
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => {
          const shareData = {
            title: `Realistiq`,
            text: `Property for rent in ${listing.location.address}`,
            url: `${env.NEXT_PUBLIC_APP_URL}/${lang}/listings/${listing.uuid}`,
          };
          if (navigator.canShare(shareData)) {
            navigator.share(shareData);
          } else {
            navigator.clipboard.writeText(
              `${env.NEXT_PUBLIC_APP_URL}/${lang}/listings/${listing.uuid}`
            );
            toast({
              variant: "default",
              title: "Link copied to clipboard",
            });
          }
        }}
      >
        <Share2 className="mr-2 h-4 w-4" /> Share
      </Button>
    </div>
  );
}
