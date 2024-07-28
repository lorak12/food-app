"use server";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export async function createUser(data: User) {
  await prisma.user.create({
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      imageUrl: data.imageUrl,
      clerkUserId: data.clerkUserId,
      role: "user",
    },
  });
}

export async function getUserByClerkUserId(clerkUserId: string) {
  return await prisma.user.findUnique({
    where: {
      clerkUserId,
    },
  });
}

export async function updateUser(clerkUserId: string, data: Partial<User>) {
  await prisma.user.update({
    where: {
      clerkUserId,
    },
    data,
  });
}
