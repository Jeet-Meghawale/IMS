import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AuthRepository from "./auth.repository.js";
import ApiError from "../../utils/ApiError.js";

class AuthService {
  async register(userData) {
    const { name, email, password } = userData;

    const existingUser = await AuthRepository.findUserByEmail(email);

    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await AuthRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return {
      user,
      token,
    };
  }

  async login(email, password) {
    const user = await AuthRepository.findUserByEmail(email);

    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid email or password");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    return {
      user,
      token,
    };
  }
}

export default new AuthService();