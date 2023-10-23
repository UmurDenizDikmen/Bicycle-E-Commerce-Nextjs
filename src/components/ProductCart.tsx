import { Products } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import formatPrice from "@/lib/formatPrice";

interface ProductCartProps {
  product: Products;
}

export default function ProductCart({ product }: ProductCartProps) {
  const starCount = product.stars;

  return (
    <Link
      href={"/product/" + product.id}
      className="shrink-0 box-border flex-wrap ml-10 bg-gray-100 m-1 hover:shadow-xl mt-2 mr-10 rounded-xl"
    >
      <figure>
        <Image
          width={500}
          height={500}
          className="bg-gray-50 object-cover w-full"
          src={product.imageUrl}
          alt={product.name}
        />
      </figure>

      <div className="flex flex-col p-3 object-cover">
        <h1 className="mt-2 font-bold text-2xl">{product.name}</h1>
        <p className="mt-2 text-sm">{product.description}</p>
        <div className="mt-2 font-bold">{formatPrice(product.price)}</div>
        <div className="text-[gold] mt-1">
          {Array.from({ length: starCount }, (_, index) => (
            <span key={index}>★</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
