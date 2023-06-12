import getListings from "@/actions/getListings";

export default async function Listings() {

  const listings = await getListings();
  console.log("🚀 ~ listings:", listings)

  return <div>Listings</div>;
}
