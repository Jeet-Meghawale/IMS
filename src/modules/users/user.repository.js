import prisma from "../../config/prisma.js";

class UserRepository {
  async createUser(data) {
    return await prisma.user.create({
      data,
    });
  }

  async getAllUsers({
    skip = 0,
    take = 10,
    search = "",
    role,
    isActive,
  }) {
    return await prisma.user.findMany({
      where: {
        ...(search && {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),

        ...(role && { role }),

        ...(typeof isActive === "boolean" && {
          isActive,
        }),
      },

      skip,

      take,

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async countUsers({
    search = "",
    role,
    isActive,
  }) {
    return await prisma.user.count({
      where: {
        ...(search && {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        }),

        ...(role && { role }),

        ...(typeof isActive === "boolean" && {
          isActive,
        }),
      },
    });
  }

  async getUserById(id) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async getUserByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async updateUser(id, data) {
    return await prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateUserStatus(id, isActive) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: {
        isActive,
      },
    });
  }
}

export default new UserRepository();