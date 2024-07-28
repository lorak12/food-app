import React from "react";
import ProductForm from "./ProductForm";
import { getTags } from "@/actions/tagsActions";
import { getOptions } from "@/actions/optionsActions";

async function Page() {
  const tags = await getTags();
  // const tags = [
  //   {
  //     id: "1",
  //     name: "Vege",
  //     textColor: "#00ff00",
  //     bgColor: "#008000",
  //     productId: "123",
  //   },
  //   {
  //     id: "2",
  //     name: "Spice",
  //     textColor: "#ff0000",
  //     bgColor: "#800000",
  //     productId: "123",
  //   },
  // ];
  const options = await getOptions();
  return (
    <div>
      <ProductForm initialTags={tags ?? []} initialOptions={options ?? []} />
    </div>
  );
}

export default Page;
