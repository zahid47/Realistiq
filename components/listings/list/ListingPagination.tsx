import { Pagination } from "@mantine/core";
import { Meta } from "@/types/db";

interface Props {
  meta: Meta;
  onPageChange: (page: number) => void;
}

export default function ListingPagination({ meta, onPageChange }: Props) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 items-center justify-end sm:justify-between lg:justify-end xl:justify-between">
        <Pagination
          color="violet"
          total={meta.total_pages}
          value={meta.current_page}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
}
