import { prisma } from "../utils/prisma.js";


export const ContactService = {
  async create(data: {
    fullName: string;
    email: string;
    subject: string;
    message: string;
  }) {
    return prisma.contactMessage.create({
      data,
    });
  },

  async getAll() {
    return prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async getById(id: any) {
    return prisma.contactMessage.findUnique({
      where: { id },
    });
  },

  async update(
    id: any,
    data: Partial<{
      fullName: string;
      email: string;
      subject: string;
      message: string;
      isRead: boolean;
    }>
  ) {
    return prisma.contactMessage.update({
      where: { id },
      data,
    });
  },

  async deleteById(id: any) {
    return prisma.contactMessage.delete({
      where: { id },
    });
  },

  async deleteAll() {
    return prisma.contactMessage.deleteMany();
  },
};