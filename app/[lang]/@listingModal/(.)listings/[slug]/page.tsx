import ListingDetails from "@/components/listings/listing-details/ListingDetails";
import InterceptedDialog from "@/components/ui/intercepted-dialog";

interface Props {
  params: {
    slug: string;
  };
}

export default function page({ params: { slug } }: Props) {
  return (
    <InterceptedDialog>
      <ListingDetails slug={slug} />
    </InterceptedDialog>
  );
}
