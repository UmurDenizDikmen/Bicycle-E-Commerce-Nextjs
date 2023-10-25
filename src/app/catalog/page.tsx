import React from "react";
import ProductCart from "@/components/ProductCart";
import prisma from "@/lib/prismadb";
import { HeadLine } from "@/components/HeadLine";
import PaginationBar from "@/components/PaginationBar";

type CatalogPageProps = {
  searchParams: { page: string };
};

export default async function CatalogPage({
  searchParams: { page = "1" },
}: CatalogPageProps) {
  const currentPage = parseInt(page);
  const pageSize = 3;
  const totalItemCount = await prisma.products.count();
  const totalPages = Math.ceil(totalItemCount / pageSize);

  const product = await prisma.products.findMany({
    orderBy: { id: "desc" },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });
  return (
    <>
      <HeadLine />
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white-100 mt-28">
        {product.map((product) => {
          return <ProductCart product={product} key={product.id} />;
        })}
      </div>

      <PaginationBar currentPage={currentPage} totalPage={totalPages} />
    </>
  );
}
