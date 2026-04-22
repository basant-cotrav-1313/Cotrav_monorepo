"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // ✅ MUST be first
const axios_1 = __importDefault(require("axios"));
// console.log("CLIENT_ID:", process.env.KEYCLOAK_CLIENT_ID);
// console.log("CLIENT_SECRET:", process.env.KEYCLOAK_CLIENT_SECRET);
// async function testToken() {
//   const res = await axios.post(
//     "https://trialapp.in/realms/cotrav-OPS/protocol/openid-connect/token",
//     new URLSearchParams({
//       grant_type: "client_credentials",
//       client_id: process.env.KEYCLOAK_CLIENT_ID!,
//       client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
//     }),
//     {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     }
//   );
//   console.log(res.data);
// }
// testToken();
async function createUser() {
    const tokenRes = await axios_1.default.post("https://trialapp.in/realms/cotrav-OPS/protocol/openid-connect/token", new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.KEYCLOAK_CLIENT_ID,
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    const accessToken = tokenRes.data.access_token;
    const userRes = await axios_1.default.post("https://trialapp.in/admin/realms/cotrav-OPS/users", {
        username: "testuser456",
        email: "test456@test.com",
        enabled: true,
        firstName: "Test",
        lastName: "User",
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
    });
    console.log("User created:", userRes.status);
}
createUser();
//# sourceMappingURL=testToken.js.map