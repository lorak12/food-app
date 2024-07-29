import React from "react";
import ProductForm from "./ProductForm";
import { getTags } from "@/actions/tagsActions";
import { getOptions } from "@/actions/optionsActions";

async function Page() {
  const tags = await getTags();
  const options = await getOptions();

  return (
    <div>
      <ProductForm initialTags={tags ?? []} initialOptions={options ?? []} />
    </div>
  );
}

export default Page;
