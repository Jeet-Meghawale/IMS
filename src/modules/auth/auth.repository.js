import prisma from "../../../prisma.config";

class AuthRepository {
  async findUserByEmail(email) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserById(id) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createUser(userData) {
    return await prisma.user.create({
      data: userData,
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
}

export default new AuthRepository();