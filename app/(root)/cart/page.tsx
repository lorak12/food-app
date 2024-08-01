import React from "react";
import CartClient from "./CartClient";
import { getOrderItemsByUserId } from "@/actions/orderActions";
import { auth } from "@clerk/nextjs/server";

async function Page() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const orderItems = await getOrderItemsByUserId(userId);

  return <CartClient />;
}

export default Page;
