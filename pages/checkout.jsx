import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";

import Image from "next/image";
import CartProduct from "../components/CartProduct";

function Checkout() {
  const items = useSelector((state) => state.items.items);
  return (
    <div className="bg-gray-100">
      <Header />

      <main className="flex  mx-auto p-5 space-x-5 space-y-5">
        <div className="bg-white">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />

          <div className="p-8 flex flex-col space-y-8 bg-gray-100">
            <div>
              {items.length === 0 ? (
                <span className="text-2xl font-semibold">
                  Your Shopping Basket is Empty
                </span>
              ) : (
                <span className="text-2xl font-semibold">Shopping Basket</span>
              )}
            </div>

            {items.map((product) => (
              <CartProduct product={product} />
            ))}
          </div>
        </div>

        <div>right side</div>
      </main>
    </div>
  );
}

export default Checkout;
