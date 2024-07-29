import { getOptions } from "@/actions/optionsActions";
import Client from "./Client";
import { getProductWithChildren } from "@/actions/productActions";
import { getTags } from "@/actions/tagsActions";

async function Page({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const product = await getProductWithChildren(productId);
  const options = await getOptions();
  const tags = await getTags();
  if (!product) {
    return <h1>Product not found</h1>;
  }
  return (
    <Client product={product} initialOptions={options} initialTags={tags} />
  );
}

export default Page;
