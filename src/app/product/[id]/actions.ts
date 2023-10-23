"use server";
import { createCart, getCart } from "@/lib/cart";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function incrementProductQuantity(productsId: string) {
  const cart = (await getCart()) ?? (await createCart());
  const articleCart = cart.items.find(
    (items) => items.productsId === productsId
  );
  if (articleCart) {
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: {
          update: {
            where: {
              id: articleCart.id,
            },
            data: {
              quantity: { increment: 1 },
            },
          },
        },
      },
    });
  } else {
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: {
          create: {
            productsId,
            quantity: 1,
          },
        },
      },
    });
  }
  revalidatePath("/product/[id]", "page");
}
