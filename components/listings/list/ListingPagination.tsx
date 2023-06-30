import { Meta } from "@/types/db";
import { Pagination } from "@mantine/core";

interface Props {
  meta: Meta;
  onPageChange: (page: number) => void;
}

export default function ListingPagination({ meta, onPageChange }: Props) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 items-center justify-end sm:justify-between lg:justify-end xl:justify-between">
        <div className="hidden sm:block lg:hidden xl:block">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{meta.from}</span> to{" "}
            <span className="font-medium">{meta.to}</span> of{" "}
            <span className="font-medium">{meta.total}</span> listings
          </p>
        </div>

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
