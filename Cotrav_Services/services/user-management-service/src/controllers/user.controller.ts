// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const userService = new UserService();


export const createUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await userService.createUser(req.body, token);

    res.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// export const getAllUsers = async (req: Request, res: Response) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const result = await userService.getAllUsers(token);

//     res.json({
//       success: true,
//       error: null,
//       response: result,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       error: err.message,
//       response: null,
//     });
//   }
// };

export const getAllUsers = async (req: Request, res: Response) => {
  console.log("controller getAllUsers called");
  try {
    const result = await userService.getAllUsers(); // ← no token

    res.json({
      success: true,
      error: null,
      response: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message,
      response: null,
    });
  }
};

export const getAllKeycloakRoles = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllKeycloakRoles();
    res.json({
      success: true,
      error: null,
      response: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: err.message,
      response: null,
    });
  }
};