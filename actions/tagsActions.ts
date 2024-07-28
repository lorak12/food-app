"use server";

import prisma from "@/lib/prisma";
import { schemas } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Get all tags
export async function getTags() {
  const tags = await prisma.tag.findMany();
  revalidatePath("/");
  return tags;
}

// Get a single tag by ID
export async function getTag(id: string) {
  const tag = await prisma.tag.findUnique({
    where: { id },
  });
  revalidatePath("/");
  return tag;
}

// Get all tags by productId
export async function getTagsByProductId(productId: string) {
  const tags = await prisma.tag.findMany({
    where: { productId },
  });
  revalidatePath("/");
  return tags;
}

// Create a new tag
export async function createTag(data: z.infer<typeof schemas.FormTagSchema>) {
  const parsedData = schemas.FormTagSchema.parse(data);

  const newTag = await prisma.tag.create({
    data: {
      name: parsedData.name,
      textColor: parsedData.textColor ?? "#FFFFFF",
      bgColor: parsedData.bgColor ?? "#000000",
    },
  });

  revalidatePath("/");
  return newTag;
}

// Update a tag by ID
export async function updateTag(
  id: string,
  data: z.infer<typeof schemas.FormTagSchema>
) {
  const parsedData = schemas.FormTagSchema.parse(data);

  const updatedTag = await prisma.tag.update({
    where: { id },
    data: {
      name: parsedData.name,
      textColor: parsedData.textColor,
      bgColor: parsedData.bgColor,
    },
  });

  revalidatePath("/");
  return updatedTag;
}

// Delete a tag by ID
export async function deleteTag(id: string) {
  const deletedTag = await prisma.tag.delete({
    where: { id },
  });

  revalidatePath("/");
  return deletedTag;
}
