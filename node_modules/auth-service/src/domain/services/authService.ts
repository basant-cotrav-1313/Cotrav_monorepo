import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {

  async register(user: any) {
    user.password = await bcrypt.hash(user.password, 10);
    return user;
  }

  async login({ email, password }: any) {

    const fakeUser = {
      id: 1,
      email: "admin@test.com",
      password: await bcrypt.hash("admin123", 10),
      roles: ["admin"]
    };

    const valid = await bcrypt.compare(password, fakeUser.password);

    if (!valid) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: fakeUser.id, roles: fakeUser.roles },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "15m" }
    );

    return { token };
  }
}
