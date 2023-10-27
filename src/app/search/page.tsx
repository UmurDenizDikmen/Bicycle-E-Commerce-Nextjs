import { HeadLine } from "@/components/HeadLine";
import ProductCart from "@/components/ProductCart";
import { prisma } from "@/lib/prismadb";
import { Metadata } from "next";

interface SearchPageProps {
  searchParams: { query: string };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search : ${query} - CoralBikes`,
  };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  const product = await prisma.products.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        {
          description: { contains: query, mode: "insensitive" },
        },
      ],
    },
  });
  if (product.length === 0) {
    return (
      <>
        <HeadLine />
        <div className="text-center mt-96 mb-96 font-bold text-2xl">
          No products found
        </div>
      </>
    );
  }
  return (
    <>
      <HeadLine />
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white-100 mt-28">
        {product.map((product) => {
          return <ProductCart product={product} key={product.id} />;
        })}
      </div>
    </>
  );
}
