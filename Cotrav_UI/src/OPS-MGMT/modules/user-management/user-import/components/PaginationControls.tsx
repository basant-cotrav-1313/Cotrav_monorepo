import type { Table } from "@tanstack/react-table";
import type { ImportedUser } from "../types/userImport.types";
import { PAGE_SIZE_OPTIONS } from "../constants/userImport.constants";
import { getPageNumbers } from "../utils/pagination.utils";
import PaginationButton from "./PaginationButton";

type Props = {
  table: Table<ImportedUser>;
};

const PaginationControls = ({ table }: Props) => {
  const { pageIndex, pageSize } = table.getState().pagination;
  const totalFiltered = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();
  const from = totalFiltered === 0 ? 0 : pageIndex * pageSize + 1;
  const to = Math.min((pageIndex + 1) * pageSize, totalFiltered);

  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
      {/* Page size selector */}
      <div className="flex items-center gap-2">
        <label
          htmlFor="page-size"
          className="text-xs text-slate-500 whitespace-nowrap"
        >
          Rows per page
        </label>
        <select
          id="page-size"
          value={pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
            table.setPageIndex(0);
          }}
          className="h-7 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0B0E2D]/20"
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Page info */}
      <span className="text-xs text-slate-500">
        {totalFiltered === 0 ? "0 results" : `${from}–${to} of ${totalFiltered}`}
      </span>

      {/* Prev / page numbers / Next */}
      <div className="flex items-center gap-1">
        <PaginationButton
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="First page"
        >
          «
        </PaginationButton>
        <PaginationButton
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          aria-label="Previous page"
        >
          ‹
        </PaginationButton>

        {getPageNumbers(pageIndex, pageCount).map((page, i) =>
          page === "…" ? (
            <span key={`ellipsis-${i}`} className="px-1 text-xs text-slate-400">
              …
            </span>
          ) : (
            <PaginationButton
              key={page}
              onClick={() => table.setPageIndex(Number(page) - 1)}
              active={pageIndex === Number(page) - 1}
              aria-label={`Page ${page}`}
              aria-current={
                pageIndex === Number(page) - 1 ? "page" : undefined
              }
            >
              {page}
            </PaginationButton>
          )
        )}

        <PaginationButton
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Next page"
        >
          ›
        </PaginationButton>
        <PaginationButton
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
          aria-label="Last page"
        >
          »
        </PaginationButton>
      </div>
    </div>
  );
};

export default PaginationControls;