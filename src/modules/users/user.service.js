import bcrypt from "bcrypt";

import UserRepository from "./user.repository.js";
import ApiError from "../../utils/ApiError.js";

class UserService {
  async createUser(userData) {
    const { name, email, password, role, isActive } = userData;

    const existingUser = await UserRepository.getUserByEmail(email);

    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserRepository.createUser({
      name,
      email,
      password: hashedPassword,
      role,
      isActive,
    });

    return user;
  }

  async getAllUsers(query) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const users = await UserRepository.getAllUsers({
      skip,
      take: limit,
      search: query.search,
      role: query.role,
      isActive:
        query.isActive === undefined
          ? undefined
          : query.isActive === "true",
    });

    const totalUsers = await UserRepository.countUsers({
      search: query.search,
      role: query.role,
      isActive:
        query.isActive === undefined
          ? undefined
          : query.isActive === "true",
    });

    return {
      users,
      pagination: {
        page,
        limit,
        totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
      },
    };
  }

  async getUserById(id) {
    const user = await UserRepository.getUserById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  }

  async updateUser(id, data) {
    const user = await UserRepository.getUserById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (data.email && data.email !== user.email) {
      const existingUser = await UserRepository.getUserByEmail(data.email);

      if (existingUser) {
        throw new ApiError(409, "Email already exists");
      }
    }

    return await UserRepository.updateUser(id, data);
  }

  async updateUserStatus(id, isActive) {
    const user = await UserRepository.getUserById(id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return await UserRepository.updateUserStatus(id, isActive);
  }
}

export default new UserService();
