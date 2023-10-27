import Link from "next/link";
import { prisma } from "@/lib/prismadb";
import formatPrices from "@/lib/formatPrice";
import { MdArrowForwardIos } from "react-icons/md";
import { ShowCase } from "@/components/ShowCase";
import { HeadLine } from "@/components/HeadLine";

export default async function Home() {
  const product = await prisma.products.findMany({
    orderBy: { id: "desc" },
  });
  const totalNumber = await prisma.products.count();
  let randomNumber = Math.floor(Math.random() * totalNumber);

  return (
    <>
      <HeadLine />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:mt-32 lg:ml-72 mr-12">
        <div className="flex flex-wrap lg:flex-col items-center mt-11 gap-10 text-center">
          <p className="font-bold  text-8xl">More Bicycle , on 2cycle</p>
          <p className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 font-semibold text-6xl lg:mt-10 underline underline-offset-[12px] cursor-pointer decoration-red-500 decoration-8 mt-20 lg:ml-0 ml-20">
            {formatPrices(
              product[randomNumber].price + product[randomNumber].price
            )}
          </p>
          <Link
            href={"/catalog"}
            className="text-neutral-400 text-2xl flex flex-row ml-32"
          >
            Our Shop
            <MdArrowForwardIos className={"mt-1 ml-2"} />
          </Link>
        </div>

        <ShowCase products={product} index={randomNumber} />
      </div>
    </>
  );
}
