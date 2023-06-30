import ListingDetails from "@/components/listings/single-listing/SingleListing";
import getQueryClient from "@/lib/getQueryClient";
import { dehydrate } from "@tanstack/react-query";
import HydrateWrapper from "@/components/providers/Hydrate";
import { getListingFromDB } from "@/actions/db-calls/listing";

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
