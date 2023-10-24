import { CartProducts } from "@/components/CartProducts";
import { getCart } from "@/lib/cart";
import formatPrice from "@/lib/formatPrice";
import setProductQuantity from "./action";
import { HomeButton } from "@/components/HomeButton";

export const metadata = {
  title: "Your cart",
};

export default async function CartPage() {
  const cart = await getCart();
  return (
    <div className="grid lg:grid-cols-2 gap-x-96 relative">
      <div>
        <h1 className="mt-28  text-3xl font-bold mb-6 lg:ml-14 pl-10 ml-8">
          Bag
        </h1>
        {cart?.items.map((products) => {
          return (
            <CartProducts
              cartItems={products}
              key={products.id}
              setProductQuantity={setProductQuantity}
            />
          );
        })}
        {!cart?.items.length && (
          <p className="ml-8 text-4xl font-bold text-yellow-500">
            You are cart is empty
          </p>
        )}
      </div>
      <div className="lg:w-96 md:w-8/12 w-full bg-gray-100 dark:bg-gray-900 h-full mt-6">
        <div className="flex flex-col lg:h-screen h-auto lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6 justify-between">
          <div>
            <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800 dark:text-white mt-3 mb-4">
              Summary
            </p>

            <div className="flex items-center justify-between pt-5">
              <p className="text-base leading-none text-gray-800 dark:text-white cursor-pointer">
                Shoptotal : {formatPrice(cart?.subtotal || 0)}
              </p>
            </div>
            <div className="flex items-center justify-between pt-5">
              <p className="text-base leading-none text-gray-800 dark:text-white cursor-pointer">
                Shipping
              </p>
            </div>
            <div className="flex items-center justify-between pt-5">
              <p className="text-base leading-none text-gray-800 dark:text-white cursor-pointer">
                Tax: {formatPrice((cart?.subtotal || 0) * 0.1)}
              </p>
            </div>
          </div>
          <div className="flex  flex-col  justify-between lg:absolute lg:bottom-0 w-80">
            <div className="flex  pb-6 justify-between lg:pt-5 pt-20 items-center">
              <p className="text-2xl leading-normal text-gray-800 dark:text-white font-bold  lg:ml-12">
                Total :
                {formatPrice(
                  (cart?.subtotal || 0) - (cart?.subtotal || 0) * 0.1
                )}
              </p>
            </div>
            <button className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700">
              Checkout
            </button>
            <HomeButton />
          </div>
        </div>
      </div>
    </div>
  );
}
