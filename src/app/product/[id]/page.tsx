import { cache } from "react";
import prisma from "@/lib/prismadb";
import { notFound } from "next/navigation";
import Image from "next/image";
import formatPrice from "@/lib/formatPrice";
import Link from "next/link";
import { Metadata } from "next";
import AddToCartButton from "@/components/AddToCartButton";
import { incrementProductQuantity } from "@/app/product/[id]/action";

type ProductPageProps = {
  params: {
    id: string;
  };
};
const getProduct = cache(async (id: string) => {
  const product = await prisma.products.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product?.name + " - CoralBikes",
    description: product?.description,
    openGraph: {
      images: [
        {
          url: product.imageUrl,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  const { name, imageUrl, description, price } = product;

  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 items-center mt-52 lg:ml-62 justify-items-center">
        <figure>
          <Image
            width={450}
            height={450}
            src="/images/coralbikes.png"
            alt={""}
            className="object-cover"
          />
        </figure>

        <ul className="flex flex-row gap-7 shrink-0 md:items-center mt-2">
          <Link href={"/"} className="font-bold cursor-pointer">
            HOME
          </Link>
          <h1 className="font-bold cursor-pointer">ABOUT</h1>
          <Link href={"/catalog"} className="font-bold cursor-pointer">
            CATALOG
          </Link>
          <h1 className="font-bold cursor-pointer">CONTACT</h1>
        </ul>
      </section>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 items-center mt-60">
        <div className="lg:ml-44 mb-8 md:mr-10">
          <Image
            src={imageUrl}
            alt={name}
            width={600}
            height={600}
            className="rounded-lg shadow-lg"
            priority
          />
        </div>
        <div className="flex flex-col gap-5 items-center overflow-hidden ">
          <h2 className="text-5xl font-bold">{name}</h2>
          <p className="text-stone-500  text-2xl ">{description}</p>
          <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-5xl">
            {formatPrice(price)}
          </p>
          <AddToCartButton
            productsId={product.id}
            incrementProductQuantity={incrementProductQuantity}
          />
        </div>
      </div>
    </>
  );
}
