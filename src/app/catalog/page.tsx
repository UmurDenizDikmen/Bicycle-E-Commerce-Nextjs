import React from "react";
import ProductCart from "@/components/ProductCart";
import prisma from "@/lib/prismadb";

export default async function CatalogPage() {
  const product = await prisma.products.findMany({
    orderBy: { id: "desc" },
  });
  return (
    <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white-100 mt-28">
      {product.map((product) => {
        return <ProductCart product={product} key={product.id} />;
      })}
    </div>
  );
}
