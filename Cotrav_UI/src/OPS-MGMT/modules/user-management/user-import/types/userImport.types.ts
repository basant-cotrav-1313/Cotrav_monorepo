
// export type RealmTab = "ops" | "client";

// export type ImportStatus = "Imported" | "Failed" | "Duplicate" | "Pending";

// export type ImportedUser = {
//   id: string;
//   user_id: string;
//   username: string;
//   email: string;
//   first_name: string;
//   last_name: string;
//   contact_no: string;
//   keycloak_user_id: string | null;
//   sync_status: string;
//   sync_status_text: ImportStatus;
//   fail_reason: string | null;
//   created_at: string;
//   realm?: RealmTab;
// };

// export type LastImport = {
//   realm: RealmTab;
//   total: number;
// } | null;

// export type KeycloakRole = {
//   db_role?: string;
//   db_column?: string;
//   db_value: number;
//   keycloak_role: string;
//   assigned_in_keycloak: number;
// };

// export type UserRoles = {
//   success: string;
//   keycloak_id: string;
//   username: string;
//   roles: KeycloakRole[];
// };


export type RealmTab = "ops" | "client";

export type ImportStatus = "Imported" | "Failed" | "Duplicate" | "Pending";

export type ImportedUser = {
  id: string;
  user_id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  contact_no: string;
  keycloak_user_id: string | null;
  sync_status: string;
  sync_status_text: ImportStatus;
  fail_reason: string | null;
  created_at: string;
  realm?: RealmTab;
};

export type LastImport = {
  realm: RealmTab;
  total: number;
} | null;

// ─── New types for the nested services response ───────────────────────────────

export type ServiceSubRole = {
  db_role: string;
  db_value: number;           // 1 = this user has DB access for this service
  assigned_in_keycloak: number; // 1 = already assigned in Keycloak
  // permissions: string[];      // list of permission strings
  permissions: Record<string, number>;
};

export type ServiceRoles = {
  [subRoleKey: string]: ServiceSubRole; // e.g. "hotel-basic", "hotel-billing"
};

export type ServicesMap = {
  [serviceName: string]: ServiceRoles;  // e.g. "hotel", "flight"
};

export type RoleAuditResponse = {
  success: string;
  keycloak_id: string;
  username: string;
  services: ServicesMap;
};

// kept for backward compat if used elsewhere
export type KeycloakRole = {
  db_role?: string;
  db_column?: string;
  db_value: number;
  keycloak_role: string;
  assigned_in_keycloak: number;
};

export type UserRoles = {
  success: string;
  keycloak_id: string;
  username: string;
  roles: KeycloakRole[];
};