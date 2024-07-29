import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import ProductCard from "./ProductCard";
import { getAvailableProducts } from "@/actions/productActions";

async function Page() {
  const products = await getAvailableProducts();
  return (
    <Tabs defaultValue="pizzas">
      <TabsList>
        <TabsTrigger value="pizzas">Pizza</TabsTrigger>
        <TabsTrigger value="fast-food">Fast Food</TabsTrigger>
      </TabsList>
      <TabsContent
        value="pizzas"
        className="grid grid-cols-5 gap-6 place-content-center"
      >
        {products.map((product) => (
          <ProductCard data={product} />
        ))}
      </TabsContent>
      <TabsContent value="fast-food">Fast food content</TabsContent>
    </Tabs>
  );
}

export default Page;
