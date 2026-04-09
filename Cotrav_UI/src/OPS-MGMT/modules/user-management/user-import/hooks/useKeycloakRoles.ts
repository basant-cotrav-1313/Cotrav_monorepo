import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import type { UserRoles } from "../types/userImport.types";

interface KeycloakRolesApiResponse {
  success: string;
  error: string;
  response: UserRoles[];
}

export const useKeycloakRoles = () => {
  const [roles, setRoles] = useState<UserRoles[]>([]);
  const [rolesMap, setRolesMap] = useState<Record<string, UserRoles>>({});
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);
  const [rolesError, setRolesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoadingRoles(true);
      setRolesError(null);
      try {
        const { data } = await axios.get<KeycloakRolesApiResponse>(
          "/api/user_management/getAllKeycloakRoles"
        );
        setRoles(data.response);
        // ← cache by keycloak_id for O(1) lookup
        const map = data.response.reduce<Record<string, UserRoles>>((acc, user) => {
          acc[user.keycloak_id] = user;
          return acc;
        }, {});
        setRolesMap(map);
      } catch (err) {
        const axiosError = err as AxiosError;
        setRolesError(axiosError.message || "Failed to fetch roles");
      } finally {
        setIsLoadingRoles(false);
      }
    };

    fetchRoles();
  }, []);

  return { roles, rolesMap, isLoadingRoles, rolesError };
};