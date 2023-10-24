import * as React from "react";
import prisma from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

async function addProduct(formData: FormData) {
  "use server";
  const session = getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/addProduct");
  }
  const name = formData.get("name")?.toString() as string;
  const description = formData.get("description")?.toString() as string;
  const imageUrl = formData.get("imageUrl")?.toString() as string;
  const price = Number(formData.get("price"));
  const stars = Number(formData.get("stars"));

  if (!name && !description && !imageUrl && !price && !stars) {
    throw new Error("Invalid Product");
  }

  await prisma.products.create({
    data: {
      name: name,
      description: description,
      imageUrl: imageUrl,
      price: price,
      stars: stars,
    },
  });
  redirect("/");
}

export default async function AddProduct() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/addProduct");
  }
  return (
    <div className="flex flex-col relative shrink-0 box-border min-h-[100px] bg-stone-300 p-5">
      <form
        className="flex flex-col relative shrink-0 box-border min-h-[100px] bg-stone-300 w-full self-stretch grow max-w-[1200px] items-stretch mx-auto p-5"
        action={addProduct}
      >
        <div className="relative shrink-0 box-border h-auto mt-5 font-bold text-2xl sm:text-3xl">
          Add Product
        </div>
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="flex flex-col relative shrink-0 box-border border mt-5 p-2.5 rounded border-solid border-stone-300"
          required={true}
        />
        <input
          type="text"
          placeholder="Description"
          name="description"
          className="flex flex-col relative shrink-0 box-border border mt-5 p-2.5 rounded border-solid border-stone-300"
          required={true}
        />
        <input
          type="url"
          placeholder="imageUrl"
          name="imageUrl"
          className="flex flex-col relative shrink-0 box-border border mt-5 p-2.5 rounded border-solid border-stone-300"
          required={true}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          className="flex flex-col relative shrink-0 box-border border mt-5 p-2.5 rounded border-solid border-stone-300"
          required={true}
        />
        <input
          type="number"
          placeholder="Stars"
          name="stars"
          className="flex flex-col relative shrink-0 box-border border mt-5 p-2.5 rounded border-solid border-stone-300"
          required={true}
        />
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}
