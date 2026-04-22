"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createUser = void 0;
const user_service_1 = require("../services/user.service");
const userService = new user_service_1.UserService();
const createUser = async (req, res) => {
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.createUser = createUser;
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
const getAllUsers = async (req, res) => {
    console.log("controller getAllUsers called");
    try {
        const result = await userService.getAllUsers(); // ← no token
        res.json({
            success: true,
            error: null,
            response: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
            response: null,
        });
    }
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=user.controller.js.map