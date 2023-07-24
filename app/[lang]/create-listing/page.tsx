/*
CRITERIA:
1. Multi step form
2. Load initial values from draft, and always save to draft onChange
3. if not signed in, ask to sign in before creating listing, and after sign in, load draft
*/

/*
steps:
1. location
2. beds, baths, floor area
3. description
4. photos (max 20, each max 5mb)
5. price
7. preview and publish
*/
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import CreateListingForm from "@/components/listings/create/CreateListingForm";

interface Props {
  params: {
    lang: string;
  };
}

export default async function CreateListing({ params }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect(`/${params.lang}/signin?callbackUrl=/create-listing`);
  return <CreateListingForm />;
}
