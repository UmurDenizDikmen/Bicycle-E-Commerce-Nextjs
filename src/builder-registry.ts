"use client";
import { Builder } from "@builder.io/react";
import Counter from "./components/Counter/Counter";
import ProductCart from "./components/ProductCart";

Builder.registerComponent(Counter, {
  name: "Counter",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});

Builder.registerComponent(ProductCart, {
  name: "ProductCart",
  inputs: [
    {
      name: "products",
      type: "string",
      required: true,
    },
  ],
});
