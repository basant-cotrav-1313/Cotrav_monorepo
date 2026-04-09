// // import type { RealmTab, ImportedUser } from "../types/userImport.types";
// // import { REALM_META, STATUS_CLASS } from "../constants/userImport.constants";

// // type Props = {
// //   activeRealm: RealmTab;
// //   users: ImportedUser[];
// //   onRealmChange: (realm: RealmTab) => void;
// // };

// // const ImportedUsersTable = ({ activeRealm, users, onRealmChange }: Props) => (
// //   <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
// //     <div className="mb-3 flex items-center justify-between">
// //       <div className="flex items-center bg-[#0B0E2D]/10 rounded-full p-0.5 gap-0.5">
// //         {(["ops", "client"] as RealmTab[]).map((realm) => (
// //           <button
// //             key={realm}
// //             type="button"
// //             onClick={() => onRealmChange(realm)}
// //             className={`rounded-full px-4 py-1 text-xs font-bold transition-all duration-200 ${
// //               activeRealm === realm
// //                 ? "bg-[#0B0E2D] text-white shadow-sm shadow-[#0B0E2D]/30"
// //                 : "text-[#0B0E2D]/50 hover:text-[#0B0E2D]"
// //             }`}
// //           >
// //             {REALM_META[realm].label}
// //           </button>
// //         ))}
// //       </div>
// //       <span className="text-xs font-semibold text-slate-500">{users.length} records</span>
// //     </div>

// //     <div className="overflow-x-auto rounded-lg border border-slate-200">
// //       <table className="min-w-full divide-y divide-slate-200 text-sm">
// //         <thead className="bg-slate-50">
// //           <tr>
// //             {["Status", "Username", "First name", "Last name", "Email", "Mobile"].map((header) => (
// //               <th key={header} className="px-4 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
// //                 {header}
// //               </th>
// //             ))}
// //           </tr>
// //         </thead>
// //         <tbody className="divide-y divide-slate-200 bg-white">
// //           {users.map((user) => (
// //             <tr key={`${user.realm}-${user.username}`}>
// //               <td className="px-4 py-2">
// //                 <span className={`inline-flex rounded-full border px-2 py-1 text-xs font-semibold ${STATUS_CLASS[user.status]}`}>
// //                   {user.status}
// //                 </span>
// //               </td>
// //               <td className="px-4 py-2 font-semibold text-slate-800">{user.username}</td>
// //               <td className="px-4 py-2 text-slate-700">{user.firstName}</td>
// //               <td className="px-4 py-2 text-slate-700">{user.lastName}</td>
// //               <td className="px-4 py-2 text-slate-700">{user.email}</td>
// //               <td className="px-4 py-2 text-slate-700">{user.mobile}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   </div>
// // );

// // export default ImportedUsersTable;


// import { useMemo, useState } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   getFilteredRowModel,
//   flexRender,
//   type ColumnDef,
//   type SortingState,
//   type RowSelectionState,
//   type ColumnFiltersState,
// } from "@tanstack/react-table";
// import type { RealmTab, ImportedUser } from "../types/userImport.types";
// import { REALM_META, STATUS_CLASS } from "../constants/userImport.constants";

// type Props = {
//   activeRealm: RealmTab;
//   users: ImportedUser[];
//   onRealmChange: (realm: RealmTab) => void;
//   onSelectionChange?: (selectedUsers: ImportedUser[]) => void;
// };

// const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// const SortIcon = ({ direction }: { direction: "asc" | "desc" | false }) => {
//   if (!direction)
//     return (
//       <span className="ml-1 inline-flex flex-col gap-[2px] opacity-30">
//         <span className="block h-0 w-0 border-x-[4px] border-b-[5px] border-x-transparent border-b-slate-500" />
//         <span className="block h-0 w-0 border-x-[4px] border-t-[5px] border-x-transparent border-t-slate-500" />
//       </span>
//     );
//   return direction === "asc" ? (
//     <span className="ml-1 inline-flex opacity-80">
//       <span className="block h-0 w-0 border-x-[4px] border-b-[5px] border-x-transparent border-b-[#0B0E2D]" />
//     </span>
//   ) : (
//     <span className="ml-1 inline-flex opacity-80">
//       <span className="block h-0 w-0 border-x-[4px] border-t-[5px] border-x-transparent border-t-[#0B0E2D]" />
//     </span>
//   );
// };

// const ImportedUsersTable = ({
//   activeRealm,
//   users,
//   onRealmChange,
//   onSelectionChange,
// }: Props) => {
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
//   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

//   const columns = useMemo<ColumnDef<ImportedUser>[]>(
//     () => [
//       {
//         id: "select",
//         header: ({ table }) => (
//           <input
//             type="checkbox"
//             className="h-4 w-4 rounded border-slate-300 accent-[#0B0E2D] cursor-pointer"
//             checked={table.getIsAllPageRowsSelected()}
//             indeterminate={table.getIsSomePageRowsSelected() ? true : undefined}
//             onChange={table.getToggleAllPageRowsSelectedHandler()}
//             aria-label="Select all rows on this page"
//           />
//         ),
//         cell: ({ row }) => (
//           <input
//             type="checkbox"
//             className="h-4 w-4 rounded border-slate-300 accent-[#0B0E2D] cursor-pointer"
//             checked={row.getIsSelected()}
//             onChange={row.getToggleSelectedHandler()}
//             aria-label={`Select user ${row.original.username}`}
//           />
//         ),
//         enableSorting: false,
//         enableColumnFilter: false,
//         size: 40,
//       },
//       {
//         accessorKey: "status",
//         header: "Status",
//         cell: ({ getValue }) => {
//           const status = getValue<string>();
//           return (
//             <span
//               className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${STATUS_CLASS[status]}`}
//             >
//               {status}
//             </span>
//           );
//         },
//         filterFn: "equalsString",
//       },
//       {
//         accessorKey: "username",
//         header: "Username",
//         cell: ({ getValue }) => (
//           <span className="font-semibold text-slate-800">{getValue<string>()}</span>
//         ),
//       },
//       {
//         accessorKey: "firstName",
//         header: "First Name",
//         cell: ({ getValue }) => (
//           <span className="text-slate-700">{getValue<string>()}</span>
//         ),
//       },
//       {
//         accessorKey: "lastName",
//         header: "Last Name",
//         cell: ({ getValue }) => (
//           <span className="text-slate-700">{getValue<string>()}</span>
//         ),
//       },
//       {
//         accessorKey: "email",
//         header: "Email",
//         cell: ({ getValue }) => (
//           <span
//             className="block max-w-[200px] truncate text-slate-700"
//             title={getValue<string>()}
//           >
//             {getValue<string>()}
//           </span>
//         ),
//       },
//       {
//         accessorKey: "mobile",
//         header: "Mobile",
//         cell: ({ getValue }) => (
//           <span className="text-slate-700">{getValue<string>()}</span>
//         ),
//       },
//     ],
//     []
//   );

//   const table = useReactTable({
//     data: users,
//     columns,
//     state: {
//       sorting,
//       globalFilter,
//       columnFilters,
//       rowSelection,
//       pagination,
//     },
//     enableRowSelection: true,
//     onSortingChange: setSorting,
//     onGlobalFilterChange: setGlobalFilter,
//     onColumnFiltersChange: setColumnFilters,
//     onRowSelectionChange: (updater) => {
//       setRowSelection(updater);
//       if (onSelectionChange) {
//         const next =
//           typeof updater === "function" ? updater(rowSelection) : updater;
//         const selectedRows = users.filter((_, i) => next[i]);
//         onSelectionChange(selectedRows);
//       }
//     },
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getRowId: (row) => `${row.realm}-${row.username}`,
//   });

//   const selectedCount = Object.keys(rowSelection).length;
//   const { pageIndex, pageSize } = table.getState().pagination;
//   const totalFiltered = table.getFilteredRowModel().rows.length;
//   const pageCount = table.getPageCount();
//   const from = pageIndex * pageSize + 1;
//   const to = Math.min((pageIndex + 1) * pageSize, totalFiltered);

//   return (
//     <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
//       {/* Header row */}
//       <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
//         {/* Realm tabs */}
//         <div className="flex items-center bg-[#0B0E2D]/10 rounded-full p-0.5 gap-0.5">
//           {(["ops", "client"] as RealmTab[]).map((realm) => (
//             <button
//               key={realm}
//               type="button"
//               onClick={() => onRealmChange(realm)}
//               aria-pressed={activeRealm === realm}
//               className={`rounded-full px-4 py-1 text-xs font-bold transition-all duration-200 ${
//                 activeRealm === realm
//                   ? "bg-[#0B0E2D] text-white shadow-sm shadow-[#0B0E2D]/30"
//                   : "text-[#0B0E2D]/50 hover:text-[#0B0E2D]"
//               }`}
//             >
//               {REALM_META[realm].label}
//             </button>
//           ))}
//         </div>

//         {/* Search */}
//         <div className="relative">
//           <svg
//             className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
//             />
//           </svg>
//           <input
//             type="search"
//             value={globalFilter}
//             onChange={(e) => {
//               setGlobalFilter(e.target.value);
//               setPagination((p) => ({ ...p, pageIndex: 0 }));
//             }}
//             placeholder="Search users…"
//             aria-label="Search users"
//             className="h-8 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0B0E2D]/20 focus:border-[#0B0E2D]/40 w-52"
//           />
//         </div>

//         {/* Record count / selection info */}
//         <span className="text-xs font-semibold text-slate-500">
//           {selectedCount > 0 ? (
//             <span className="text-[#0B0E2D]">{selectedCount} selected · </span>
//           ) : null}
//           {totalFiltered !== users.length
//             ? `${totalFiltered} of ${users.length} records`
//             : `${users.length} records`}
//         </span>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg border border-slate-200">
//         <table
//           className="min-w-full divide-y divide-slate-200 text-sm"
//           aria-label="Imported users"
//         >
//           <thead className="bg-slate-50">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     scope="col"
//                     className={`px-4 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate-500 select-none ${
//                       header.column.getCanSort()
//                         ? "cursor-pointer hover:text-slate-800 transition-colors"
//                         : ""
//                     }`}
//                     onClick={header.column.getToggleSortingHandler()}
//                     aria-sort={
//                       header.column.getIsSorted() === "asc"
//                         ? "ascending"
//                         : header.column.getIsSorted() === "desc"
//                         ? "descending"
//                         : undefined
//                     }
//                   >
//                     <span className="inline-flex items-center">
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                       {header.column.getCanSort() && (
//                         <SortIcon direction={header.column.getIsSorted()} />
//                       )}
//                     </span>
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody className="divide-y divide-slate-200 bg-white">
//             {table.getRowModel().rows.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={columns.length}
//                   className="px-4 py-10 text-center text-sm text-slate-400"
//                 >
//                   {globalFilter
//                     ? `No users match "${globalFilter}"`
//                     : "No users found for this realm."}
//                 </td>
//               </tr>
//             ) : (
//               table.getRowModel().rows.map((row) => (
//                 <tr
//                   key={row.id}
//                   className={`transition-colors ${
//                     row.getIsSelected()
//                       ? "bg-[#0B0E2D]/5"
//                       : "hover:bg-slate-50"
//                   }`}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <td key={cell.id} className="px-4 py-2">
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination controls */}
//       <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
//         {/* Page size selector */}
//         <div className="flex items-center gap-2">
//           <label
//             htmlFor="page-size"
//             className="text-xs text-slate-500 whitespace-nowrap"
//           >
//             Rows per page
//           </label>
//           <select
//             id="page-size"
//             value={pageSize}
//             onChange={(e) => {
//               table.setPageSize(Number(e.target.value));
//               setPagination((p) => ({ ...p, pageIndex: 0 }));
//             }}
//             className="h-7 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0B0E2D]/20"
//           >
//             {PAGE_SIZE_OPTIONS.map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Page info */}
//         <span className="text-xs text-slate-500">
//           {totalFiltered === 0 ? "0 results" : `${from}–${to} of ${totalFiltered}`}
//         </span>

//         {/* Prev / page numbers / Next */}
//         <div className="flex items-center gap-1">
//           <PaginationButton
//             onClick={() => table.firstPage()}
//             disabled={!table.getCanPreviousPage()}
//             aria-label="First page"
//           >
//             «
//           </PaginationButton>
//           <PaginationButton
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//             aria-label="Previous page"
//           >
//             ‹
//           </PaginationButton>

//           {getPageNumbers(pageIndex, pageCount).map((page, i) =>
//             page === "…" ? (
//               <span key={`ellipsis-${i}`} className="px-1 text-xs text-slate-400">
//                 …
//               </span>
//             ) : (
//               <PaginationButton
//                 key={page}
//                 onClick={() => table.setPageIndex(Number(page) - 1)}
//                 active={pageIndex === Number(page) - 1}
//                 aria-label={`Page ${page}`}
//                 aria-current={pageIndex === Number(page) - 1 ? "page" : undefined}
//               >
//                 {page}
//               </PaginationButton>
//             )
//           )}

//           <PaginationButton
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//             aria-label="Next page"
//           >
//             ›
//           </PaginationButton>
//           <PaginationButton
//             onClick={() => table.lastPage()}
//             disabled={!table.getCanNextPage()}
//             aria-label="Last page"
//           >
//             »
//           </PaginationButton>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ─── Helpers ─────────────────────────────────────────────── */

// type PaginationButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
//   active?: boolean;
// };

// const PaginationButton = ({
//   active,
//   disabled,
//   children,
//   ...props
// }: PaginationButtonProps) => (
//   <button
//     type="button"
//     disabled={disabled}
//     className={`inline-flex h-7 min-w-[28px] items-center justify-center rounded-md px-2 text-xs font-medium transition-colors
//       ${
//         active
//           ? "bg-[#0B0E2D] text-white"
//           : disabled
//           ? "text-slate-300 cursor-not-allowed"
//           : "text-slate-600 hover:bg-slate-100"
//       }`}
//     {...props}
//   >
//     {children}
//   </button>
// );


// function getPageNumbers(
//   current: number,
//   total: number
// ): (number | "…")[] {
//   if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
//   const pages: (number | "…")[] = [];
//   const add = (n: number) => pages.push(n);

//   add(1);
//   if (current > 3) pages.push("…");

//   const start = Math.max(2, current);
//   const end = Math.min(total - 1, current + 2);
//   for (let i = start; i <= end; i++) add(i);

//   if (current < total - 3) pages.push("…");
//   add(total);

//   return pages;
// }

// export default ImportedUsersTable;



// "use client";

// import { flexRender } from "@tanstack/react-table";
// import type { RealmTab, ImportedUser, UserRoles } from "../types/userImport.types";
// import { REALM_META } from "../constants/userImport.constants";
// import { useImportedUsersTable } from "../hooks/useImportedUsersTable";
// import RealmTabSwitch from "./RealmTabSwitch";
// import SortIcon from "./SortIcon";
// import PaginationControls from "./PaginationControls";

// type Props = {
//   activeRealm: RealmTab;
//   users: ImportedUser[];
//   onRealmChange: (realm: RealmTab) => void;
//   onSelectionChange?: (selectedUsers: ImportedUser[]) => void;
//    isLoading?: boolean;  // ← add
//   error?: string | null;
//   rolesMap?: Record<string, UserRoles>;      // ← add
//   isLoadingRoles?: boolean; 
// };

// const ImportedUsersTable = ({
//   activeRealm,
//   // users,
//   users = [],
//   onRealmChange,
//   onSelectionChange,
//   isLoading,  
//   error, 
//   rolesMap = {},        // ← add
//   isLoadingRoles = false, // ← add
   
// }: Props) => {
//   const { table, globalFilter, setGlobalFilter, selectedCount, totalFiltered } =
//     useImportedUsersTable({ users, onSelectionChange, rolesMap, isLoadingRoles });

//   return (
//     <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">

//           <h2 className="text-base font-bold text-[#0B0E2D] mb-4">
//     Imported {REALM_META[activeRealm].label} Users
//   </h2>
//       {/* Header row */}
//      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
  
//   {/* Left: Tabs */}
//   <RealmTabSwitch
//     activeRealm={activeRealm}
//     variant="pill"
//     onChange={onRealmChange}
//   />

//   {/* Right: Search + Count */}
//   <div className="flex items-center gap-3 ml-auto">
    
//     {/* Search */}
//     <div className="relative">
//       <svg
//         className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
//         />
//       </svg>

//       <input
//         type="search"
//         value={globalFilter}
//         onChange={(e) => setGlobalFilter(e.target.value)}
//         placeholder="Search users…"
//         className="h-8 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs w-52"
//       />
//     </div>

//     {/* Count */}
//     <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
//       {selectedCount > 0 && (
//         <span className="text-[#0B0E2D]">{selectedCount} selected · </span>
//       )}
//       {totalFiltered !== users.length
//         ? `${totalFiltered} of ${users.length} records`
//         : `${users.length} records`}
//     </span>

//   </div>
// </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg border border-slate-200">
//         <table
//           className="min-w-full divide-y divide-slate-200 text-sm"
//           aria-label="Imported users"
//         >
//           <thead className="bg-slate-50">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     scope="col"
//                     className={`px-4 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate-500 select-none ${
//                       header.column.getCanSort()
//                         ? "cursor-pointer hover:text-slate-800 transition-colors"
//                         : ""
//                     }`}
//                     onClick={header.column.getToggleSortingHandler()}
//                     aria-sort={
//                       header.column.getIsSorted() === "asc"
//                         ? "ascending"
//                         : header.column.getIsSorted() === "desc"
//                         ? "descending"
//                         : undefined
//                     }
//                   >
//                     <span className="inline-flex items-center">
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                       {header.column.getCanSort() && (
//                         <SortIcon direction={header.column.getIsSorted()} />
//                       )}
//                     </span>
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody className="divide-y divide-slate-200 bg-white">
//             {table.getRowModel().rows.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={table.getAllColumns().length}
//                   className="px-4 py-10 text-center text-sm text-slate-400"
//                 >
//                   {globalFilter
//                     ? `No users match "${globalFilter}"`
//                     : "No users found for this realm."}
//                 </td>
//               </tr>
//             ) : (
//               table.getRowModel().rows.map((row) => (
//                 <tr
//                   key={row.id}
//                   className={`transition-colors ${
//                     row.getIsSelected()
//                       ? "bg-[#0B0E2D]/5"
//                       : "hover:bg-slate-50"
//                   }`}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <td key={cell.id} className="px-4 py-2">
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </td>
//                   ))}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <PaginationControls table={table} />
//     </div>
//   );
// };

// export default ImportedUsersTable;


"use client";

import { flexRender } from "@tanstack/react-table";
import type { RealmTab, ImportedUser, UserRoles } from "../types/userImport.types";
import { REALM_META } from "../constants/userImport.constants";
import { useImportedUsersTable } from "../hooks/useImportedUsersTable";
import RealmTabSwitch from "./RealmTabSwitch";
import SortIcon from "./SortIcon";
import PaginationControls from "./PaginationControls";
import SearchBar from "./SearchBar"; // ← new

type Props = {
  activeRealm: RealmTab;
  users: ImportedUser[];
  onRealmChange: (realm: RealmTab) => void;
  onSelectionChange?: (selectedUsers: ImportedUser[]) => void;
  isLoading?: boolean;
  error?: string | null;
  rolesMap?: Record<string, UserRoles>;
  isLoadingRoles?: boolean;
};

const ImportedUsersTable = ({
  activeRealm,
  users = [],
  onRealmChange,
  onSelectionChange,
  isLoading,
  error,
  rolesMap = {},
  isLoadingRoles = false,
}: Props) => {
  const { table, globalFilter, setGlobalFilter, selectedCount, totalFiltered } =
    useImportedUsersTable({ users, onSelectionChange, rolesMap, isLoadingRoles });

  return (
    <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-base font-bold text-[#0B0E2D] mb-4">
        Imported {REALM_META[activeRealm].label} Users
      </h2>

      {/* Header row */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">

        {/* Left: Tabs */}
        <RealmTabSwitch
          activeRealm={activeRealm}
          variant="pill"
          onChange={onRealmChange}
        />

        {/* Right: Search + Count */}
        <div className="flex items-center gap-3 ml-auto">

          {/* ✨ Attractive search bar */}
          <SearchBar
            value={globalFilter}
            onChange={setGlobalFilter}
            placeholder="Search users…"
          />

          {/* Count */}
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            {selectedCount > 0 && (
              <span className="text-[#0B0E2D]">{selectedCount} selected · </span>
            )}
            {totalFiltered !== users.length
              ? `${totalFiltered} of ${users.length} records`
              : `${users.length} records`}
          </span>

        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table
          className="min-w-full divide-y divide-slate-200 text-sm"
          aria-label="Imported users"
        >
          <thead className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className={`px-4 py-2 text-left text-xs font-bold uppercase tracking-wide text-slate-500 select-none ${
                      header.column.getCanSort()
                        ? "cursor-pointer hover:text-slate-800 transition-colors"
                        : ""
                    }`}
                    onClick={header.column.getToggleSortingHandler()}
                    aria-sort={
                      header.column.getIsSorted() === "asc"
                        ? "ascending"
                        : header.column.getIsSorted() === "desc"
                        ? "descending"
                        : undefined
                    }
                  >
                    <span className="inline-flex items-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.getCanSort() && (
                        <SortIcon direction={header.column.getIsSorted()} />
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={table.getAllColumns().length}
                  className="px-4 py-10 text-center text-sm text-slate-400"
                >
                  {globalFilter
                    ? `No users match "${globalFilter}"`
                    : "No users found for this realm."}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`transition-colors ${
                    row.getIsSelected()
                      ? "bg-[#0B0E2D]/5"
                      : "hover:bg-slate-50"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <PaginationControls table={table} />
    </div>
  );
};

export default ImportedUsersTable;