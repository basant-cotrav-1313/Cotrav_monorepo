// import { useState, useCallback, useEffect } from "react";
// import axios, { AxiosError } from "axios";
// import type { ImportedUser } from "../types/userImport.types";

// interface KeycloakUsersApiResponse {
//   success: string;
//   error: string;
//   response: {
//     total_users: number;
//     total_imported: number;
//     total_duplicate: number;
//     total_failed: number;
//     users: ImportedUser[];
//   };
// }

// export const useKeycloakUsers = () => {
//   const [users, setUsers] = useState<ImportedUser[]>([]);
//   const [isLoadingUsers, setIsLoadingUsers] = useState(false);
//   const [usersError, setUsersError] = useState<string | null>(null);

//   const fetchUsers = useCallback(async () => {
//     setIsLoadingUsers(true);
//     setUsersError(null);
//     try {
//       const { data } = await axios.get<KeycloakUsersApiResponse>(
//         "/api/user_management/getAllKeycloakUsers"
//       );
//       setUsers(data.response.users); // ← was data, now data.response.users
//     } catch (err) {
//       const axiosError = err as AxiosError;
//       setUsersError(axiosError.message || "Failed to fetch users");
//     } finally {
//       setIsLoadingUsers(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchUsers();
//   }, [fetchUsers]);

//   return { users, isLoadingUsers, usersError, fetchUsers };
// };

import { useState, useCallback, useEffect } from "react";
import axios, { AxiosError } from "axios";
import type { RealmTab, ImportedUser } from "../types/userImport.types"; // ← add RealmTab

interface KeycloakUsersApiResponse {
  success: string;
  error: string;
  response: {
    total_users: number;
    total_imported: number;
    total_duplicate: number;
    total_failed: number;
    users: ImportedUser[];
  };
}

const REALM_API: Record<RealmTab, string> = {
  ops: "/api/user_management/getAllKeycloakUsers",
  client: "/api/user_management/getAllKeycloakUsers", // ← replace when client API ready
};

export const useKeycloakUsers = (activeRealm: RealmTab) => { // ← accept activeRealm
  const [users, setUsers] = useState<ImportedUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    console.log("fetchUsers called for realm:", activeRealm);
    setIsLoadingUsers(true);
    setUsersError(null);
    try {
      const { data } = await axios.get<KeycloakUsersApiResponse>(
        REALM_API[activeRealm] // ← use realm-specific URL
      );
      const tagged = data.response.users.map((u) => ({
        ...u,
        realm: activeRealm, // ← tag each user with current realm
      }));
      console.log("tagged users:", tagged.length, "realm:", activeRealm);
      setUsers(tagged);
    } catch (err) {
      const axiosError = err as AxiosError;
      setUsersError(axiosError.message || "Failed to fetch users");
    } finally {
      setIsLoadingUsers(false);
    }
  }, [activeRealm]); // ← re-fetch when realm changes

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, isLoadingUsers, usersError, fetchUsers };
};