import prisma from "./prismadb";
import { cookies } from "next/dist/client/components/headers";
import { Cart, Prisma } from "@prisma/client";

export type CartWithProduct = Prisma.CartGetPayload<{
  include: { items: { include: { products: true } } };
}>;

export type ShoppingCart = CartWithProduct & {
  size: number;
  subtotal: number;
};

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { products: true };
}>;

export async function getCart(): Promise<ShoppingCart | null> {
  const localCartId = cookies().get("localCartId")?.value;
  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: { items: { include: { products: true } } },
      })
    : null;

  if (!cart) {
    return null;
  }
  return {
    ...cart,
    size: cart.items.reduce((acc, items) => acc + items.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, items) => acc + items.quantity * items.products.price,
      0
    ),
  };
}

export async function createCart(): Promise<ShoppingCart> {
  let newCart: Cart;

  newCart = await prisma.cart.create({
    data: {},
  });
  cookies().set("localCartId", newCart.id);
  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}
