"use server";

import prisma from "@/lib/prisma";
import { schemas } from "@/schemas/schemas";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createAddress(data: z.infer<typeof schemas.Address>) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized access");
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      id: true,
    },
  });
  if (!user) {
    throw new Error("User not in the database.");
  }

  const parsedData = schemas.Address.parse(data);

  const newAddress = await prisma.address.create({
    data: {
      name: parsedData.name,
      phoneNumber: parsedData.phoneNumber,
      houseNumber: parsedData.houseNumber,
      apartmentNumber: parsedData.apartmentNumber ?? null,
      floorNumber: parsedData.floorNumber ?? null,
      street: parsedData.street,
      city: parsedData.city,
      zipCode: parsedData.zipCode,
      user: {
        connect: { id: user.id },
      },
    },
  });
  revalidatePath("/");
  return newAddress;
}

export async function getAddressesByUserId(userId: string) {
  if (!userId) {
    throw new Error("Unauthorized access");
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      id: true,
    },
  });
  if (!user) {
    throw new Error("User not in the database.");
  }

  const addresses = await prisma.address.findMany({
    where: { user: { id: user.id } },
  });
  revalidatePath("/");
  return addresses;
}

export async function deleteAddress(addressId: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized access");
  }

  if (!addressId) {
    throw new Error("Unauthorized access");
  }

  await prisma.address.delete({
    where: { id: addressId },
  });
  revalidatePath("/");
}

export async function updateAddress(
  addressId: string,
  data: z.infer<typeof schemas.Address>
) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized access");
  }
  if (!addressId) {
    throw new Error("No addressId provided");
  }

  const parsedData = schemas.Address.parse(data);
  const updatedAddress = await prisma.address.update({
    where: { id: addressId },
    data: {
      name: parsedData.name,
      phoneNumber: parsedData.phoneNumber,
      houseNumber: parsedData.houseNumber,
      apartmentNumber: parsedData.apartmentNumber ?? null,
      floorNumber: parsedData.floorNumber ?? null,
      street: parsedData.street,
      city: parsedData.city,
      zipCode: parsedData.zipCode,
    },
  });
  revalidatePath("/");
  return updatedAddress;
}
