import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSearchParamsString } from "@/lib/utils";
import { GetListingsPayload } from "@/lib/validators/listing";
import { Icons } from "@/components/ui/Icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOptions: Array<GetListingsPayload["sort"]> = [
  "Recommended",
  "Latest",
  "Cheapest",
  "Most expensive",
  "Largest",
  "Smallest",
];

interface Props {
  searchParams: GetListingsPayload;
}

export default function SortingDropdown({ searchParams }: Props) {
  const [selected, setSelected] = useState(searchParams.sort);
  const router = useRouter();
  const pathname = usePathname();

  const addSortToUrl = (sort: GetListingsPayload["sort"]) => {
    setSelected(sort);
    const newSearchParams = {
      ...searchParams,
      sort,
    };
    const qs = getSearchParamsString(newSearchParams);
    const url = `${pathname}?${qs}`;
    router.push(url);
  };

  return (
    <div className="flex items-center gap-2">
      <Icons.Sort size={16} className="text-slate-700" />
      <Select value={selected || sortOptions[0]} onValueChange={addSortToUrl}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
