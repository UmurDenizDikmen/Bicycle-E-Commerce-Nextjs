import { prisma } from "@/lib/prismadb";
import { cookies } from "next/dist/client/components/headers";
import { Cart, CartItem, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

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
  const session = await getServerSession(options);
  let cart: CartWithProduct | null = null;
  if (session) {
    cart = await prisma.cart.findFirst({
      where: { userId: session.user.id },
      include: { items: { include: { products: true } } },
    });
  } else {
    const localCartId = cookies().get("localCartId")?.value;
    cart = localCartId
      ? await prisma.cart.findUnique({
          where: { id: localCartId },
          include: { items: { include: { products: true } } },
        })
      : null;
  }

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
  const session = await getServerSession(options);

  let newCart: Cart;

  if (session) {
    newCart = await prisma.cart.create({
      data: {
        userId: session.user.id,
      },
    });
  } else {
    newCart = await prisma.cart.create({
      data: {},
    });
    cookies().set("localCartId", newCart.id);
  }

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}
export async function mergeAnonymousCartIntoUserCart(userId: string) {
  const localCartId = cookies().get("localCartId")?.value;
  const localCart = localCartId
    ? await prisma.cart.findUnique({
        where: {
          id: localCartId,
        },
        include: { items: true },
      })
    : null;

  if (!localCart) {
    return;
  }

  const userCart = await prisma.cart.findFirst({
    where: {
      userId,
    },
    include: { items: true },
  });

  await prisma.$transaction(async (tx) => {
    if (userCart) {
      const mergedCartItems = mergeCartItems(localCart.items, userCart.items);
      await tx.cartItem.deleteMany({
        where: { cartId: userCart.id },
      });

      await tx.cart.update({
        where: { id: userCart.id },
        data: {
          items: {
            createMany: {
              data: mergedCartItems.map((item) => ({
                cartId: userCart.id,
                productsId: item.productsId,
                quantity: item.quantity,
              })),
            },
          },
        },
      });
    } else {
      await tx.cart.create({
        data: {
          userId,
          items: {
            createMany: {
              data: localCart.items.map((items) => ({
                productsId: items.productsId,
                quantity: items.quantity,
              })),
            },
          },
        },
      });
    }

    await tx.cart.delete({
      where: { id: localCart.id },
    });

    cookies().set("localCartId", "");
  });
}

function mergeCartItems(...cartItems: CartItem[][]) {
  return cartItems.reduce((acc, items) => {
    items.forEach((items) => {
      const existingItems = acc.find((i) => i.productsId === items.productsId);
      if (existingItems) {
        existingItems.quantity += items.quantity;
      } else {
        acc.push(items);
      }
    });
    return acc;
  }, [] as CartItem[]);
}
