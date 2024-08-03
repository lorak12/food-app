import React from "react";
import DeliveryClient from "./DeliveryClient";
import { getAddressesByUserId } from "@/actions/addressActions";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

async function Page() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }

  const addresses = await getAddressesByUserId(userId);

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

  return <DeliveryClient data={addresses} totalPrice={totalPrice} />;
}

export default Page;
