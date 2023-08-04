import { Skeleton } from "@/components/ui/skeleton";

export default function ListingsListSkeleton() {
  return (
    <ul>
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i} className="mb-2 ml-2 mr-2">
          <Skeleton className="h-[16rem]" />
        </li>
      ))}
    </ul>
  );
}
