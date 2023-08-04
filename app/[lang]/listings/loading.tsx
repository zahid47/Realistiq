import ListingsListSkeleton from "./_components/ListingsListSkeleton";
import ListingsMapSkeleton from "./_components/ListingsMapSkeleton";

export default function loading() {
  return (
    <div className="flex flex-row">
      <div className="h-[calc(100vh-4rem)] w-full lg:w-2/5">
        <ListingsListSkeleton />
      </div>
      <div className="mb-2 mr-2 hidden overflow-hidden rounded-lg lg:block lg:w-3/5">
        <ListingsMapSkeleton />
      </div>
    </div>
  );
}
