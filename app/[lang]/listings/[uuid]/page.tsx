import { getListingFromDB } from "@/actions/db-calls/listing";
import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import ListingDetails from "@/components/listings/single-listing/SingleListing";
import HydrateWrapper from "@/components/providers/Hydrate";

interface Props {
  params: {
    uuid: string;
  };
}

export default async function page({ params: { uuid } }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["listing", uuid],
    queryFn: () => getListingFromDB(uuid),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrateWrapper state={dehydratedState}>
        <ListingDetails uuid={uuid} />
      </HydrateWrapper>
    </>
  );
}
