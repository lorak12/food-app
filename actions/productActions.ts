"use server";

import prisma from "@/lib/prisma";
import { schemas } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Get all products with dependencies
export async function getProductsWithChildren() {
  const products = await prisma.product.findMany({
    include: {
      options: {
        include: {
          options: true,
        },
      },
      tags: true,
      image: true,
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });
  revalidatePath("/");
  return products;
}
//Get all products without dependencies
export async function getProducts() {
  const products = await prisma.product.findMany();
  revalidatePath("/");
  return products;
}

// Get all available products

export async function getAvailableProducts() {
  const products = await prisma.product.findMany({
    where: { isAvailable: true },
    include: {
      options: {
        include: {
          options: true,
        },
      },
      tags: true,
      image: true,
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });
  revalidatePath("/");
  return products;
}

// Get a single product by ID
export async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  revalidatePath("/");
  return product;
}

// Get single product with dependencies
export async function getProductWithChildren(id: string) {
  const products = await prisma.product.findUnique({
    where: { id },
    include: {
      options: {
        include: {
          options: true,
        },
      },
      tags: true,
      image: true,
      reviews: {
        include: {
          user: true,
        },
      },
    },
  });
  revalidatePath("/");
  return products;
}

// Create a new product
export async function createProduct(data: z.infer<typeof schemas.Product>) {
  const parsedData = schemas.FormProductSchema.parse(data);

  const newProduct = await prisma.product.create({
    data: {
      name: parsedData.name,
      toppings: parsedData.toppings,
      basePrice: parsedData.basePrice,
      category: parsedData.category,
      isAvailable: parsedData.isAvailable ?? false,
      options: {
        connect: [
          ...parsedData.options.map((option) => {
            return {
              id: option.id,
            };
          }),
        ],
      },
      tags: {
        connect: [
          ...parsedData.tags.map((tag) => {
            return {
              id: tag.id,
            };
          }),
        ],
      },
      image: {
        create: {
          url: parsedData.image.url,
        },
      },
    },
  });

  revalidatePath("/");
  return newProduct;
}

// Update a product by ID
export async function updateProduct(
  id: string,
  data: z.infer<typeof schemas.Product>
) {
  const parsedData = schemas.Product.parse(data);

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: {
      name: parsedData.name,
      toppings: parsedData.toppings,
      basePrice: parsedData.basePrice,
      category: parsedData.category,
      isAvailable: parsedData.isAvailable,

      options: {
        set: [],
        connect: [
          ...parsedData.options.map((option) => {
            return {
              id: option.id,
            };
          }),
        ],
      },
      tags: {
        set: [],
        connect: [
          ...parsedData.tags.map((tag) => {
            return {
              id: tag.id,
            };
          }),
        ],
      },
      image: {
        upsert: {
          where: { id: parsedData.image.id },
          update: {
            url: parsedData.image.url,
          },
          create: {
            url: parsedData.image.url,
          },
        },
      },
    },
  });

  revalidatePath("/");
  return updatedProduct;
}

// Delete a product by ID
export async function deleteProduct(id: string) {
  const deletedProduct = await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/");
  return deletedProduct;
}
