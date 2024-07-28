import React from "react";
import Client from "./Client";
import { getProducts } from "@/actions/productActions";

async function Page() {
  const products = await getProducts();
  return <Client products={products} />;
}

export default Page;
