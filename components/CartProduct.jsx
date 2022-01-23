import React, { useEffect, useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  riseItemQty,
  reduceItemQty,
  removeItem,
} from "../store/actions/itemsAction";

function CartProduct({ product }) {
  const { id, title, description, price, category, image } = product;
  const items = useSelector((state) => state.items.items);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const MAX_RATING = 5;
  const MIN_RATING = 1;
  const [randomStars] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  useEffect(() => {
    setQty(items.find((item) => item.id === id).qty);
  }, [items]);

  const [hasPrime] = useState(Math.random() < 0.5);

  const riseQty = () => {
    dispatch(riseItemQty(product));
  };

  const reduceQty = () => {
    if (qty > 1) {
      dispatch(reduceItemQty(product));
    }
  };

  const removeItemFromBasket = () => {
    dispatch(removeItem(product));
  };

  return (
    <div className="bg-white p-4 rounded-sm relative grid grid-cols-5 gap-x-4 gap-y-8 items-center justify-items-center ">
      <div className="text-sm absolute top-2 right-2 italic text-gray-400">
        {category}
      </div>

      <div className=" col-span-2 md:col-span-1">
        <Image src={image} width={150} height={180} objectFit="content" />
      </div>

      <div className="col-span-3">
        <div className="mt-4 font-medium line-clamp-2">
          <p>{title}</p>
        </div>

        <div className="mt-3 flex">
          {Array(randomStars)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 w-5 text-amber-500" />
            ))}

          {Array(5 - randomStars)
            .fill()
            .map((_, i) => (
              <StarIconOutline key={i} className="h-5 w-5 text-amber-500" />
            ))}
        </div>

        <div className="font-semibold">
          <span className="text-xs">US$</span>{" "}
          <span className="text-lg">{price.toFixed(2)}</span>
        </div>

        {hasPrime && (
          <div className="text-sm flex flex-row space-x-2 items-center">
            <img src="https://links.papareact.com/fdw" className="w-12" />
            <p>FREE Next-day Delivery</p>
          </div>
        )}

        <div className=" mt-8 text-xs line-clamp-2">{description}</div>
      </div>

      <div className=" flex flex-row md:block items-center space-x-12 md:space-x-0  col-span-5   sm:col-span-3 sm:col-start-3 md:col-span-1">
        <div className="flex items-center space-x-4 justify-center ">
          <div
            className="h-7 w-7 bg-yellow-400 rounded-full text-lg font-semibold flex justify-center items-center cursor-pointer"
            onClick={riseQty}
          >
            +
          </div>

          <div>{qty}</div>

          <div
            className="h-7 w-7 bg-yellow-400 rounded-full text-lg font-semibold flex justify-center items-center cursor-pointer"
            onClick={reduceQty}
          >
            -
          </div>
        </div>
        <button
          className="md:mt-12 px-4 justify-self-end py-2 font-semibold bg-gradient-to-b from-yellow-200 to-yellow-400"
          onClick={removeItemFromBasket}
        >
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CartProduct;
