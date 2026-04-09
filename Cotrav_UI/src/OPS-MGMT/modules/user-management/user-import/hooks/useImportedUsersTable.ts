// import { useState } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   getFilteredRowModel,
//   type SortingState,
//   type RowSelectionState,
//   type ColumnFiltersState,
// } from "@tanstack/react-table";
// import type { ImportedUser } from "../types/userImport.types";
// import { userImportColumns } from "../components/ImportedUsersTable.columns";

// type UseImportedUsersTableProps = {
//   users: ImportedUser[];
//   onSelectionChange?: (selectedUsers: ImportedUser[]) => void;
// };

// export const useImportedUsersTable = ({
//   users,
//   onSelectionChange,
// }: UseImportedUsersTableProps) => {
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
//   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

//   const table = useReactTable({
//     data: users,
//     columns: userImportColumns,
//     state: { sorting, globalFilter, columnFilters, rowSelection, pagination },
//     enableRowSelection: true,
//     onSortingChange: setSorting,
//     onGlobalFilterChange: (value) => {
//       setGlobalFilter(value);
//       setPagination((p) => ({ ...p, pageIndex: 0 }));
//     },
//     onColumnFiltersChange: setColumnFilters,
//     onRowSelectionChange: (updater) => {
//       const next =
//         typeof updater === "function" ? updater(rowSelection) : updater;
//       setRowSelection(next);
//       if (onSelectionChange) {
//         // Use getRowId-based keys, not array indices
//         const selectedRows = users.filter(
//           (u) => next[`${u.realm}-${u.username}`]
//         );
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
//   const totalFiltered = table.getFilteredRowModel().rows.length;

//   return {
//     table,
//     globalFilter,
//     setGlobalFilter: (value: string) => {
//       setGlobalFilter(value);
//       setPagination((p) => ({ ...p, pageIndex: 0 }));
//     },
//     selectedCount,
//     totalFiltered,
//   };
// };



// "use no memo";

// import { useState } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   getFilteredRowModel,
//   type SortingState,
//   type RowSelectionState,
//   type ColumnFiltersState,
// } from "@tanstack/react-table";
// import type { ImportedUser, UserRoles } from "../types/userImport.types";
// import { userImportColumns } from "../components/ImportedUsersTable.columns";

// type UseImportedUsersTableProps = {
//   users: ImportedUser[];
//   onSelectionChange?: (selectedUsers: ImportedUser[]) => void;
//    rolesMap?: Record<string, UserRoles>;
//   isLoadingRoles?: boolean;
// };

// export const useImportedUsersTable = ({
//   users,
//   onSelectionChange,
//   rolesMap = {},
//   isLoadingRoles = false,
// }: UseImportedUsersTableProps) => {
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [globalFilter, setGlobalFilter] = useState("");
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
//   const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

//   const table = useReactTable({
//     data: users,
//     columns: userImportColumns,
//     state: { sorting, globalFilter, columnFilters, rowSelection, pagination },
//     enableRowSelection: true,
//     onSortingChange: setSorting,
//     onGlobalFilterChange: (value) => {
//       setGlobalFilter(value);
//       setPagination((p) => ({ ...p, pageIndex: 0 }));
//     },
//     onColumnFiltersChange: setColumnFilters,
//     onRowSelectionChange: (updater) => {
//       const next =
//         typeof updater === "function" ? updater(rowSelection) : updater;
//       setRowSelection(next);
//       if (onSelectionChange) {
//         const selectedRows = users.filter(
//           (u) => next[`${u.realm}-${u.username}`]
//         );
//         onSelectionChange(selectedRows);
//       }
//     },
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getRowId: (row) => `${row.realm}-${row.username}`,
//     // ← restrict global filter to these columns only
//     globalFilterFn: (row, _columnId, filterValue) => {
//       const search = filterValue.toLowerCase();
//       return (
//         String(row.getValue("username") ?? "").toLowerCase().includes(search) ||
//         String(row.getValue("email") ?? "").toLowerCase().includes(search) ||
//         String(row.getValue("firstName") ?? "").toLowerCase().includes(search) ||
//         String(row.getValue("lastName") ?? "").toLowerCase().includes(search)
//       );
//     },
//   });

//   const selectedCount = Object.keys(rowSelection).length;
//   const totalFiltered = table.getFilteredRowModel().rows.length;

//   return {
//     table,
//     globalFilter,
//     setGlobalFilter: (value: string) => {
//       setGlobalFilter(value);
//       setPagination((p) => ({ ...p, pageIndex: 0 }));
//     },
//     selectedCount,
//     totalFiltered,
//   };
// };

"use no memo";

import { useState, useMemo } from "react"; // ← add useMemo
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
  type RowSelectionState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import type { ImportedUser, UserRoles } from "../types/userImport.types";
import { userImportColumns } from "../components/ImportedUsersTable.columns";

type UseImportedUsersTableProps = {
  users: ImportedUser[];
  onSelectionChange?: (selectedUsers: ImportedUser[]) => void;
  rolesMap?: Record<string, UserRoles>;
  isLoadingRoles?: boolean;
};

export const useImportedUsersTable = ({
  users,
  onSelectionChange,
  rolesMap = {},
  isLoadingRoles = false,
}: UseImportedUsersTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // ← columns now dynamic based on rolesMap
  const columns = useMemo(
    () => userImportColumns({ rolesMap, isLoadingRoles }),
    [rolesMap, isLoadingRoles]
  );

  const table = useReactTable({
    data: users,
    columns, // ← was userImportColumns
    state: { sorting, globalFilter, columnFilters, rowSelection, pagination },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onGlobalFilterChange: (value) => {
      setGlobalFilter(value);
      setPagination((p) => ({ ...p, pageIndex: 0 }));
    },
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(next);
      if (onSelectionChange) {
        const selectedRows = users.filter(
          (u) => next[`${u.realm}-${u.username}`]
        );
        onSelectionChange(selectedRows);
      }
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => `${row.realm}-${row.username}`,
    globalFilterFn: (row, _columnId, filterValue) => {
      const search = filterValue.toLowerCase();
      return (
        String(row.getValue("username") ?? "").toLowerCase().includes(search) ||
        String(row.getValue("email") ?? "").toLowerCase().includes(search) ||
        String(row.getValue("first_name") ?? "").toLowerCase().includes(search) || // ← fix field name
        String(row.getValue("last_name") ?? "").toLowerCase().includes(search)     // ← fix field name
      );
    },
  });

  const selectedCount = Object.keys(rowSelection).length;
  const totalFiltered = table.getFilteredRowModel().rows.length;

  return {
    table,
    globalFilter,
    setGlobalFilter: (value: string) => {
      setGlobalFilter(value);
      setPagination((p) => ({ ...p, pageIndex: 0 }));
    },
    selectedCount,
    totalFiltered,
  };
};