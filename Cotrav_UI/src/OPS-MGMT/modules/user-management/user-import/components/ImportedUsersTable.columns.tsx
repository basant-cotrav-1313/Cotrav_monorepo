// import type { ColumnDef } from "@tanstack/react-table";
// import type { ImportedUser, ImportStatus } from "../types/userImport.types";
// import { STATUS_CLASS } from "../constants/userImport.constants";

// export const userImportColumns: ColumnDef<ImportedUser>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <input
//         type="checkbox"
//         className="h-4 w-4 rounded border-slate-300 accent-[#0B0E2D] cursor-pointer"
//         checked={table.getIsAllPageRowsSelected()}
//         onChange={table.getToggleAllPageRowsSelectedHandler()}
//         aria-label="Select all rows on this page"
//       />
//     ),
//     cell: ({ row }) => (
//       <input
//         type="checkbox"
//         className="h-4 w-4 rounded border-slate-300 accent-[#0B0E2D] cursor-pointer"
//         checked={row.getIsSelected()}
//         onChange={row.getToggleSelectedHandler()}
//         aria-label={`Select user ${row.original.username}`}
//       />
//     ),
//     enableSorting: false,
//     enableColumnFilter: false,
//     size: 40,
//   },
//   {
//     // accessorKey: "status",
//     accessorKey: "sync_status_text",
//     header: "Status",
//     cell: ({ getValue }) => {
//       const status = getValue<ImportStatus>();
//       return (
//         <span
//           className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${STATUS_CLASS[status]}`}
//         >
//           {status}
//         </span>
//       );
//     },
//     filterFn: "equalsString",
//   },
//   {
//     accessorKey: "username",
//     header: "Username",
//     cell: ({ getValue }) => (
//       <span className="font-semibold text-slate-800">{getValue<string>()}</span>
//     ),
//   },
//   {
//     // accessorKey: "firstName",
//     accessorKey: "first_name",
//     header: "First Name",
//     cell: ({ getValue }) => (
//       <span className="text-slate-700">{getValue<string>()}</span>
//     ),
//   },
//   {
//     // accessorKey: "lastName",
//     accessorKey: "last_name",
//     header: "Last Name",
//     cell: ({ getValue }) => (
//       <span className="text-slate-700">{getValue<string>()}</span>
//     ),
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//     cell: ({ getValue }) => (
//       <span
//         className="block max-w-[200px] truncate text-slate-700"
//         title={getValue<string>()}
//       >
//         {getValue<string>()}
//       </span>
//     ),
//   },
//   {
//     // accessorKey: "mobile",
//     accessorKey: "contact_no",
//     header: "Mobile",
//     cell: ({ getValue }) => (
//       <span className="text-slate-700">{getValue<string>()}</span>
//     ),
//   },
// ];


// import type { ColumnDef } from "@tanstack/react-table";
// import type { ImportedUser, ImportStatus } from "../types/userImport.types";
// import { STATUS_CLASS } from "../constants/userImport.constants";
// import { parseFailReason, getRawErrors } from "../utils/failReason.utils";
// import RoleAccessButton from "./RoleAccessButton";

// export const userImportColumns: ColumnDef<ImportedUser>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <input
//         type="checkbox"
//         className="h-4 w-4 rounded border-slate-300 accent-[#0B0E2D] cursor-pointer"
//         checked={table.getIsAllPageRowsSelected()}
//         onChange={table.getToggleAllPageRowsSelectedHandler()}
//         aria-label="Select all rows on this page"
//       />
//     ),
//     cell: ({ row }) => (
//       <input
//         type="checkbox"
//         className="h-4 w-4 rounded border-slate-300 accent-[#0B0E2D] cursor-pointer"
//         checked={row.getIsSelected()}
//         onChange={row.getToggleSelectedHandler()}
//         aria-label={`Select user ${row.original.username}`}
//       />
//     ),
//     enableSorting: false,
//     enableColumnFilter: false,
//     size: 40,
//   },
//   {
//     accessorKey: "sync_status_text",
//     header: "Status",
//     cell: ({ getValue }) => {
//       const status = getValue<ImportStatus>();
//       return (
//         <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${STATUS_CLASS[status]}`}>
//           {status}
//         </span>
//       );
//     },
//     filterFn: "equalsString",
//   },
   
//   {
//     accessorKey: "fail_reason",
//     header: "Fail Reason",
//     enableSorting: false,
//     cell: ({ getValue, row }) => {
//       const raw = getValue<string | null>();
//       const status = row.original.sync_status_text;

//       if (status !== "Failed") {
//         return <span className="text-slate-300">—</span>;
//       }

//       const errors = getRawErrors(raw);
//       const message = parseFailReason(raw);

//       return (
//         <div className="flex flex-col gap-1">
//           {errors.length > 1 ? (
//             errors.map((e, i) => (
//               <span
//                 key={i}
//                 className="inline-flex w-fit items-center gap-1 rounded-md border border-red-100 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700"
//               >
//                 <span className="font-bold capitalize">{e.field}:</span>
//                 {e.humanMessage}
//               </span>
//             ))
//           ) : (
//             <span className="inline-flex w-fit items-center rounded-md border border-red-100 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
//               {message}
//             </span>
//           )}
//         </div>
//       );
//     },
//   },
//   {
//     id: "role_access",
//     header: "Role Access",
//     enableSorting: false,
//     cell: ({ row }) => {
//       const status = row.original.sync_status_text;
//       if (status !== "Imported") {
//         return <span className="text-slate-300">—</span>;
//       }
//       return (
//         <RoleAccessButton
//           username={row.original.username}
//           onClick={(username) => {
//             console.log("Assign role for:", username);
//           }}
//         />
//       );
//     },
//   },
//   {
//     accessorKey: "username",
//     header: "Username",
//     cell: ({ getValue }) => (
//       <span className="font-semibold text-slate-800">{getValue<string>()}</span>
//     ),
//   },
//   {
//     accessorKey: "first_name",
//     header: "First Name",
//     cell: ({ getValue }) => (
//       <span className="text-slate-700">{getValue<string>()}</span>
//     ),
//   },
//   {
//     accessorKey: "last_name",
//     header: "Last Name",
//     cell: ({ getValue }) => (
//       <span className="text-slate-700">{getValue<string>()}</span>
//     ),
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//     cell: ({ getValue }) => (
//       <span className="block max-w-[200px] truncate text-slate-700" title={getValue<string>()}>
//         {getValue<string>()}
//       </span>
//     ),
//   },
//   {
//     accessorKey: "contact_no",
//     header: "Mobile",
//     cell: ({ getValue }) => (
//       <span className="text-slate-700">{getValue<string>()}</span>
//     ),
//   },
  
 
// ];


import type { ColumnDef } from "@tanstack/react-table";
import type { ImportedUser, ImportStatus, UserRoles } from "../types/userImport.types"; // ← add UserRoles
import { STATUS_CLASS } from "../constants/userImport.constants";
import { parseFailReason, getRawErrors } from "../utils/failReason.utils";
import RoleAccessButton from "./RoleAccessButton";
import KeycloakPermissionsButton from "./KeycloakPermissionsButton";

// ← add options type
type ColumnsOptions = {
  rolesMap: Record<string, UserRoles>;
  isLoadingRoles: boolean;
};

// ← convert from array to function
export const userImportColumns = ({ rolesMap, isLoadingRoles }: ColumnsOptions): ColumnDef<ImportedUser>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-slate-300 accent-[#0B0E2D] cursor-pointer"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
        aria-label="Select all rows on this page"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-slate-300 accent-[#0B0E2D] cursor-pointer"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
        aria-label={`Select user ${row.original.username}`}
      />
    ),
    enableSorting: false,
    enableColumnFilter: false,
    size: 40,
  },
  {
    accessorKey: "sync_status_text",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<ImportStatus>();
      return (
        <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${STATUS_CLASS[status]}`}>
          {status}
        </span>
      );
    },
    filterFn: "equalsString",
  },
  {
    accessorKey: "username",
    header: "Username",
    cell: ({ getValue }) => (
      <span className="font-semibold text-slate-800">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "first_name",
    header: "First Name",
    cell: ({ getValue }) => (
      <span className="text-slate-700">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
    cell: ({ getValue }) => (
      <span className="text-slate-700">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => (
      <span className="block max-w-[200px] truncate text-slate-700" title={getValue<string>()}>
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "contact_no",
    header: "Mobile",
    cell: ({ getValue }) => (
      <span className="text-slate-700">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "fail_reason",
    header: "Fail Reason",
    enableSorting: false,
    cell: ({ getValue, row }) => {
      const raw = getValue<string | null>();
      const status = row.original.sync_status_text;

      if (status !== "Failed") {
        return <span className="text-slate-300">—</span>;
      }

      const errors = getRawErrors(raw);
      const message = parseFailReason(raw);

      return (
        <div className="flex flex-col gap-1">
          {errors.length > 1 ? (
            errors.map((e, i) => (
              <span
                key={i}
                className="inline-flex w-fit items-center gap-1 rounded-md border border-red-100 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700"
              >
                <span className="font-bold capitalize">{e.field}:</span>
                {e.humanMessage}
              </span>
            ))
          ) : (
            <span className="inline-flex w-fit items-center rounded-md border border-red-100 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
              {message}
            </span>
          )}
        </div>
      );
    },
  },
  {
  id: "role_access",
  header: "Role Access",
  enableSorting: false,
  cell: ({ row }) => {
    const status = row.original.sync_status_text;
    if (status !== "Imported") {
      return <span className="text-slate-300">—</span>;
    }
    return (
     <RoleAccessButton
  username={row.original.username}
  keycloakUserId={row.original.keycloak_user_id}
  firstName={row.original.first_name}   
  lastName={row.original.last_name}     
/>
    );
  },
},
 {
    id: "keycloak_permissions",
    header: "Keycloak Permissions",
    enableSorting: false,
    cell: ({ row }) => {
      const status = row.original.sync_status_text;
      if (status !== "Imported") {
        return <span className="text-slate-300">—</span>;
      }
      return (
        <KeycloakPermissionsButton
          username={row.original.username}
          keycloakUserId={row.original.keycloak_user_id}
          firstName={row.original.first_name}
          lastName={row.original.last_name}
        />
      );
    },
  },
];