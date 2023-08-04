import { getListingFromDB } from "@/actions/db-calls/listing";
import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/lib/getQueryClient";
import HydrateWrapper from "@/components/shared/Hydrate";
import ListingDetails from "./_components/SingleListing";

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
