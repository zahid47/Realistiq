import ListingDetails from "@/components/listings/listing-details/ListingDetails";
import getQueryClient from "@/lib/getQueryClient";
import { getListing } from "@/actions/api-calls/listing";
import { dehydrate } from "@tanstack/react-query";
import HydrateWrapper from "@/components/providers/Hydrate";

interface Props {
  params: {
    slug: string;
  };
}

export default async function page({ params: { slug } }: Props) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["listing", slug],
    queryFn: () => getListing(slug),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrateWrapper state={dehydratedState}>
        <ListingDetails slug={slug} />
      </HydrateWrapper>
    </>
  );
}
