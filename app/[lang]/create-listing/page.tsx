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
import { env } from "@/env.mjs";
import CreateListingForm from "@/components/listings/create/CreateListingForm";

export default function CreateListing() {
  if (env.NEXT_PUBLIC_NODE_ENV === "production") {
    return (
      <p className="text-center text-3xl text-slate-500">
        <i>[Coming Soon]</i>
      </p>
    );
  }

  return <CreateListingForm />;
}
