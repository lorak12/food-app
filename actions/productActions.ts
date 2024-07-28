"use server";

import prisma from "@/lib/prisma";
import { schemas } from "@/schemas/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Get all products with dependencies
export async function getProductsWithChildren() {
  const products = await prisma.product.findMany({
    include: {
      options: true,
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

// Get a single product by ID
export async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  revalidatePath("/");
  return product;
}

// Create a new product
export async function createProduct(data: z.infer<typeof schemas.Product>) {
  const parsedData = schemas.Product.parse(data);

  const newProduct = await prisma.product.create({
    data: {
      name: parsedData.name,
      toppings: parsedData.toppings,
      price: parsedData.price,
      category: parsedData.category,
      isAvailable: parsedData.isAvailable,
      options: {
        create: parsedData.options.map((option) => ({
          id: option.id,
          name: option.name,
          options: {
            create: option.options.map((optionItem) => ({
              id: optionItem.id,
              value: optionItem.value,
              label: optionItem.label,
              optionId: optionItem.optionId,
            })),
          },
        })),
      },
      tags: {
        create: parsedData.tags.map((tag) => ({
          id: tag.id,
          name: tag.name,
          textColor: tag.textColor,
          bgColor: tag.bgColor,
          productId: tag.productId,
        })),
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
      price: parsedData.price,
      category: parsedData.category,
      isAvailable: parsedData.isAvailable,
      options: {
        upsert: parsedData.options.map((option) => ({
          where: { id: option.id },
          update: {
            name: option.name,
            options: {
              upsert: option.options.map((optionItem) => ({
                where: { id: optionItem.id },
                update: {
                  value: optionItem.value,
                  label: optionItem.label,
                  optionId: optionItem.optionId,
                },
                create: {
                  id: optionItem.id,
                  value: optionItem.value,
                  label: optionItem.label,
                  optionId: optionItem.optionId,
                },
              })),
            },
          },
          create: {
            id: option.id,
            name: option.name,
            options: {
              create: option.options.map((optionItem) => ({
                id: optionItem.id,
                value: optionItem.value,
                label: optionItem.label,
                optionId: optionItem.optionId,
              })),
            },
          },
        })),
      },
      tags: {
        upsert: parsedData.tags.map((tag) => ({
          where: { id: tag.id },
          update: {
            name: tag.name,
            textColor: tag.textColor,
            bgColor: tag.bgColor,
            productId: tag.productId,
          },
          create: {
            id: tag.id,
            name: tag.name,
            textColor: tag.textColor,
            bgColor: tag.bgColor,
            productId: tag.productId,
          },
        })),
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
