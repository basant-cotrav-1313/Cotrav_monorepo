import { api } from "./api";

console.log(import.meta.env.VITE_API_BASE_URL);

export const getAllUsers = () => {
  return api.get("/api/user_management/getAllKeycloakUsers");
};

export const createUser = (data: any) => {
  return api.post("/api/user_management/createUser", data);
};

export const getAllKeycloakRoles = () => {
  return api.get("/api/user_management/getAllKeycloakRoles");
};