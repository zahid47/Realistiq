import Listings from "@/components/Listings";
import getQueryClient from "@/lib/getQueryClient";
import getListings from "@/actions/getListings";
import { dehydrate } from "@tanstack/react-query";
import HydrateWrapper from "@/components/providers/Hydrate";

export default async function ListingsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["listings"],
    queryFn: getListings,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrateWrapper state={dehydratedState}>
      <Listings />
    </HydrateWrapper>
  );
}
