"use server";

import prisma from "@/lib/prisma";
import { schemas } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Get all options
export async function getOptions() {
  const options = await prisma.option.findMany({
    include: {
      options: true,
    },
  });
  revalidatePath("/");
  return options;
}

// Get a single option by ID
export async function getOption(id: string) {
  const option = await prisma.option.findUnique({
    where: { id },
    include: {
      options: true,
    },
  });
  revalidatePath("/");
  return option;
}

// Create a new option
export async function createOption(
  data: z.infer<typeof schemas.FormOptionSchema>
) {
  const parsedData = schemas.FormOptionSchema.parse(data);

  const newOption = await prisma.option.create({
    data: {
      name: parsedData.name,
      options: {
        create: parsedData.options.map((optionItem) => ({
          value: optionItem.value,
          label: optionItem.label,
          price: optionItem.price, // Added price field
        })),
      },
    },
  });

  revalidatePath("/");
  return newOption;
}

// Update an option by ID
export async function updateOption(
  id: string,
  data: z.infer<typeof schemas.FormOptionSchema>
) {
  const parsedData = schemas.FormOptionSchema.parse(data);

  const updatedOption = await prisma.option.update({
    where: { id },
    data: {
      name: parsedData.name,
      options: {
        deleteMany: {}, // Clear existing options
        create: parsedData.options.map((optionItem) => ({
          value: optionItem.value,
          label: optionItem.label,
          price: optionItem.price, // Added price field
        })),
      },
    },
  });

  revalidatePath("/");
  return updatedOption;
}

// Delete an option by ID
export async function deleteOption(id: string) {
  const deletedOption = await prisma.option.delete({
    where: { id },
  });

  revalidatePath("/");
  return deletedOption;
}
