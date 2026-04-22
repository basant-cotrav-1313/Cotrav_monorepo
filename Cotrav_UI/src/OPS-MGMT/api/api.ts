import axios from "axios";

console.log(import.meta.env.VITE_API_BASE_URL); // ← add here

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});