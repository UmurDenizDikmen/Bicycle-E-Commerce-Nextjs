import React from "react";
import { notFound, redirect } from "next/navigation";
import { getCart } from "@/lib/cart";
import { MyAccountButton } from "./MyAccountButton";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

async function searchProducst(formData: FormData) {
  "use server";
  const searchQuery = formData.get("searchQuery")?.toString() as string;
  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  } else {
    notFound();
  }
}

export default async function Navbar() {
  const session = getServerSession(options);
  const cart = await getCart();

  return (
    <div>
      <div className="grid grid-cols-1  shadow  dark:border-stone-600 bg-gray-200 md:grid-cols-2 lg:grid-cols-2 justify-between  lg:fixed top-0 left-0 right-0 items-center w-full justify-items-center bg-white-300  rounded-sm h-20">
        <form action={searchProducst}>
          <input
            name="searchQuery"
            type="text"
            placeholder="Search"
            className="mr-2.5 p-1.5 rounded border-solid border-stone-300 border-b border-l border-r border-t"
          />
        </form>
        <div className="items-center flex justify-end flex-row gap-7 font-bold">
          <MyAccountButton session={session} />
          <a href={"/cart"} className="no-underline">
            Cart
          </a>
          <p className="text-red-500 flex items-center justify-center">
            {cart?.size} items
          </p>
        </div>
      </div>
    </div>
  );
}
