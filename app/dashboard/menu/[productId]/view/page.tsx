import { getCategories } from "@/actions/categoryActions";
import Client from "./Client";
import { getProduct } from "@/actions/productActions";

async function Page({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const product = await getProduct(productId);
  const categories = await getCategories();
  // @ts-ignore
  return <Client product={product} categories={categories} />;
}

export default Page;
