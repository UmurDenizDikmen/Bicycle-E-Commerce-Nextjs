import React from "react";
import Image from "next/image";
import Link from "next/link";

export const HeadLine = () => {
  return (
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
  );
};
