// src/app.ts
import express from "express";
import userRoutes from "./routes/user.routes";
import cors from "cors";


const app = express();

app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

// app.use("/users", userRoutes);
app.use("/api/user_management", userRoutes);

export default app;