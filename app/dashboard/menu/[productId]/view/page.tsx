import Client from "./Client";
import { getProductWithChildren } from "@/actions/productActions";

async function Page({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const product = await getProductWithChildren(productId);
  if (!product) {
    return <h1>Product not found</h1>;
  }
  return <Client product={product} />;
}

export default Page;
