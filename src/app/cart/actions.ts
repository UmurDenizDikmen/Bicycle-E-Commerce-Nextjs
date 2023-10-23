"use server";
import { createCart, getCart } from "@/lib/cart";
import prisma from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productsId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());
  const articleCart = cart.items.find(
    (items) => items.productsId === productsId
  );

  if (quantity === 0 && articleCart) {
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: {
          delete: {
            id: articleCart.id,
          },
        },
      },
    });
  } else if (quantity !== 0 && articleCart) {
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
              quantity,
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
            quantity,
          },
        },
      },
    });
  }
  revalidatePath("/cart", "page");
}
