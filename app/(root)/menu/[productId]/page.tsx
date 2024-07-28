import React from "react";
import { products } from "../page";
import Client from "./Client";

function Page() {
  return <Client product={products[0]} />;
}

export default Page;
