"use server";
import { revalidatePath } from "next/cache";
import { createCart, getCart } from "@/lib/cart";
import { prisma } from "@/lib/prismadb";

export default async function setProductQuantity(
  productsId: string,
  quantity: number
) {
  const cart = (await getCart()) ?? (await createCart());
  const articleInCart = cart.items.find(
    (item) => item.productsId === productsId
  );

  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: {
              id: articleInCart.id,
            },
          },
        },
      });
    }
  } else {
    if (articleInCart) {
      await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          items: {
            update: {
              where: {
                id: articleInCart.id,
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
  }

  revalidatePath("/cart", "page");
}
