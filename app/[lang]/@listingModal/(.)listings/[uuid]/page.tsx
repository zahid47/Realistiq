import ListingDetails from "@/components/listings/single-listing/SingleListing";
import InterceptedDialog from "@/components/ui/intercepted-dialog";

interface Props {
  params: {
    uuid: string;
  };
}

export default function page({ params: { uuid } }: Props) {
  return (
    <InterceptedDialog>
      <ListingDetails uuid={uuid} />
    </InterceptedDialog>
  );
}
