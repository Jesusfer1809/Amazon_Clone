import React, { useState } from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/outline";

function Product({ product }) {
  const { id, title, description, price, category, image } = product;

  const MAX_RATING = 5;
  const MIN_RATING = 1;
  const [randomStars] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);

  return (
    <div className="bg-white p-8 rounded-sm relative">
      <div className="text-sm absolute top-2 right-2 italic text-gray-400">
        {category}
      </div>

      <div>
        <Image src={image} width={150} height={180} objectFit="content" />
      </div>

      <div className="mt-8 font-medium line-clamp-2">
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
        <div className="text-sm flex space-x-2 items-center">
          <img src="https://links.papareact.com/fdw" className="w-12" />
          <p>FREE Next-day Delivery</p>
        </div>
      )}

      {!hasPrime && <div className="h-12">&nbsp;</div>}

      <div className=" mt-8 text-xs line-clamp-2">{description}</div>

      <button className="mt-12 w-full py-2 font-semibold bg-gradient-to-b from-yellow-200 to-yellow-400">
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
