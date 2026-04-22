import dotenv from "dotenv";
dotenv.config();   // ✅ MUST be first

import axios from "axios";

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
  const tokenRes = await axios.post(
    "https://trialapp.in/realms/cotrav-OPS/protocol/openid-connect/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.KEYCLOAK_CLIENT_ID!,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET!,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const accessToken = tokenRes.data.access_token;

  const userRes = await axios.post(
    "https://trialapp.in/admin/realms/cotrav-OPS/users",
    {
      username: "testuser456",
      email: "test456@test.com",
      enabled: true,
      firstName: "Test",
      lastName: "User",
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("User created:", userRes.status);
}

createUser();