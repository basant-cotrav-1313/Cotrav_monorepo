import type { RealmTab, ImportStatus, ImportedUser } from "../types/userImport.types";

export const REALM_META: Record<RealmTab, { label: string; note: string }> = {
  ops: {
    label: "OPS",
    note: "Import internal operations users into the OPS Keycloak realm."
  },
  client: {
    label: "Client",
    note: "Import customer-side users into the Client Keycloak realm."
  }
};

export const STATUS_CLASS: Record<ImportStatus, string> = {
  Imported: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Failed: "border-rose-200 bg-rose-50 text-rose-700",
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  Duplicate: "border-amber-200 bg-amber-50 text-amber-700",
};

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

//  temporary mock data — replace with API call later


// export const MOCK_IMPORTED_USERS: ImportedUser[] = [
//    {
//     realm: "ops",
//     sync_status_text: "Imported",
//     username: "ops.anita",
//     first_name: "Anita",
//     last_name: "Sharma",
//     email: "anita.sharma@cotrav.com",
//     mobile: "+91-9876500011"
//   },
//   {
//     realm: "ops",
//     sync_status_text: "Failed",
//     username: "ops.rohan",
//     first_name: "Rohan",
//     last_name: "Yadav",
//     email: "rohan.yadav@cotrav.com",
//     mobile: "+91-9876500022"
//   },
//   {
//     realm: "ops",
//     sync_status_text: "Pending",
//     username: "ops.megha",
//     first_name: "Megha",
//     last_name: "Kale",
//     email: "megha.kale@cotrav.com",
//     mobile: "+91-9876500033"
//   },
//   {
//     realm: "client",
//     sync_status_text: "Imported",
//     username: "client.aman",
//     first_name: "Aman",
//     last_name: "Gupta",
//     email: "aman.gupta@clientcorp.com",
//     mobile: "+91-9899900011"
//   },
//   {
//     realm: "client",
//     sync_status_text: "Imported",
//     username: "client.neha",
//     first_name: "Neha",
//     last_name: "Sethi",
//     email: "neha.sethi@clientcorp.com",
//     mobile: "+91-9899900022"
//   },
//   {
//     realm: "client",
//     sync_status_text: "Failed",
//     username: "client.samir",
//     first_name: "Samir",
//     last_name: "Khan",
//     email: "samir.khan@clientcorp.com",
//     mobile: "+91-9899900033"
//   }
// ];