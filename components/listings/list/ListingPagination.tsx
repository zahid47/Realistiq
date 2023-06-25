import { Pagination } from "@mantine/core";

interface Props {
  meta: {
    current_page: number;
    total_pages: number;
    total: number;
    from: number;
    to: number;
  };
  onPageChange: (page: number) => void;
}

export default function ListingPagination({ meta, onPageChange }: Props) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{meta.from}</span> to{" "}
            <span className="font-medium">{meta.to}</span> of{" "}
            <span className="font-medium">{meta.total}</span> listings
          </p>
        </div>

        <Pagination
          color="violet"
          siblings={1}
          total={meta.total_pages}
          value={meta.current_page}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
}
