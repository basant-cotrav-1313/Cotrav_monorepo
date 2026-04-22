// src/routes/user.routes.ts
import { Router } from "express";
import { createUser, getAllUsers, getAllKeycloakRoles  } from "../controllers/user.controller";

const router = Router();

router.post("/", createUser);
router.get("/getAllKeycloakUsers", getAllUsers);
router.get("/getAllKeycloakRoles", getAllKeycloakRoles);

export default router;