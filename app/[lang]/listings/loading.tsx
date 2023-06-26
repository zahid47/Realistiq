import ListingsListSkeleton from "@/components/skeletons/ListingsListSkeleton";
import ListingsMapSkeleton from "@/components/skeletons/ListingsMapSkeleton";

export default function loading() {
  return (
    <div className="flex flex-row">
      <div className="h-[calc(100vh-4rem)] w-2/5">
        <ListingsListSkeleton />
      </div>
      <div className="mb-2 mr-2 w-3/5 overflow-hidden rounded-lg">
        <ListingsMapSkeleton />
      </div>
    </div>
  );
}
