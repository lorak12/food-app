"use server";
import prisma from "@/lib/prisma";
import { schemas } from "@/schemas/schemas";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createOrderItem(
  data: z.infer<typeof schemas.FormOrderItemSchema>,
  productId: string
) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User must be authenticated to create an order item");
  }
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const parsedData = schemas.FormOrderItemSchema.parse(data);

  const newOrderItem = await prisma.orderItem.create({
    data: {
      productId: productId,
      quantity: parsedData.quantity,
      price: parsedData.price,
      userId: user.id,
      pickedOptions: {
        connect: [
          ...parsedData.pickedOptions.map((option) => {
            return {
              id: option.id,
            };
          }),
        ],
      },
    },
    include: {
      pickedOptions: true,
    },
  });
  revalidatePath("/");
  return newOrderItem;
}

export async function updateOrderItem(
  orderItemId: string,
  data: z.infer<typeof schemas.OrderItem>
) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User must be authenticated to create an order item");
  }

  const parsedData = schemas.OrderItem.parse(data);
  const orderItem = await prisma.orderItem.update({
    where: { id: orderItemId },
    data: {
      quantity: parsedData.quantity,
      price: parsedData.price,
      pickedOptions: {
        updateMany: parsedData.pickedOptions.map((option) => ({
          where: { id: option.id },
          data: {
            value: option.value,
            label: option.label,
            price: option.price,
          },
        })),
      },
      userId: parsedData.userId,
      productId: parsedData.productId,
      orderId: parsedData.orderId,
    },
  });
  revalidatePath(`/`);
  return orderItem;
}

export async function deleteOrderItem(orderItemId: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User must be authenticated to create an order item");
  }

  const deletedOrderItem = await prisma.orderItem.delete({
    where: { id: orderItemId },
  });
  revalidatePath(`/`);
  return deletedOrderItem;
}

// Get all order items by order ID

export async function getOrderItemsByOrderId(orderId: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User must be authenticated to create an order item");
  }

  const orderItems = await prisma.orderItem.findMany({
    where: { orderId },
    include: {
      pickedOptions: true,
      product: true,
    },
  });
  revalidatePath(`/`);
  return orderItems;
}

// Get order items by user ID

export async function getOrderItemsByUserId(userId: string) {
  const { userId: uId } = auth();
  if (!uId) {
    throw new Error("User must be authenticated to create an order item");
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const orderItems = await prisma.orderItem.findMany({
    where: { userId: user.id },
    include: {
      pickedOptions: true,
      product: {
        include: {
          options: true,
        },
      },
      order: true,
    },
  });
  revalidatePath(`/`);
  return orderItems;
}

// Get order items by product ID

export async function getOrderItemsByProductId(productId: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User must be authenticated to create an order item");
  }

  const orderItems = await prisma.orderItem.findMany({
    where: { productId },
    include: {
      pickedOptions: true,
      product: true,
    },
  });
  revalidatePath(`/`);
  return orderItems;
}

export async function createOrder(
  data: z.infer<typeof schemas.Order>,
  deliveryPrice: number
) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User must be authenticated to create an order");
  }
  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      orderItems: true,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  const totalPrice = user.orderItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.price,
    0
  );

  const parsedData = schemas.Order.parse(data);
  const newOrder = await prisma.order.create({
    data: {
      status: "pending",
      totalPrice: totalPrice + deliveryPrice,
      user: {
        connect: {
          id: user.id,
        },
      },
      address: {
        connect: {
          id: parsedData.addressId,
        },
      },
      items: {
        connect: [
          ...user.orderItems.map((item) => {
            return {
              id: item.id,
            };
          }),
        ],
      },
    },
  });
  await prisma.orderItem.deleteMany({
    where: { userId: user.id },
  });
  revalidatePath(`/`);
  return newOrder;
}
