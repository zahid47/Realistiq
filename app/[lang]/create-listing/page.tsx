import { redirect } from "next/navigation";
import { getListingsFromDB } from "@/actions/db-calls/listing";
import { getCurrentUser } from "@/lib/auth";
import { checkPlan } from "@/lib/plan";
import CreateListingForm from "./_components/CreateListingForm";
import MaxListingsAlert from "./_components/MaxListingsAlert";

/*
TODO:
CRITERIA:
1. Multi step form (done)
2. Load initial values from draft, and always save to draft onChange
3. if not signed in, ask to sign in before creating listing, and after sign in, load draft
*/

export const dynamic = "force-dynamic";

interface Props {
  params: {
    lang: string;
  };
}

export default async function CreateListing({ params }: Props) {
  const user = await getCurrentUser();
  if (!user) redirect(`/${params.lang}/signin?callbackUrl=/create-listing`);

  const { isAgency } = await checkPlan();
  if (!isAgency) {
    const { listings: UserLisings } = await getListingsFromDB({
      owner_id: user.id,
      limit: 2,
      page: 1,
      saved: "false",
      sort: "Latest",
    });
    if (UserLisings.length >= 1) {
      return <MaxListingsAlert />;
    }
  }
  return <CreateListingForm />;
}
