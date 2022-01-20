import React from "react";
import Product from "./Product";

function ProductFeed({ products }) {
  return (
    <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 md:-mt-40 lg:-mt-52 z-30 relative">
      {
        products.slice(0, 4).map((product) => (
          <Product key={product.id} product={product} />
        )) //dyz
      }

      <img className=" col-span-full " src="https://links.papareact.com/dyz" />

      <div className="sm:col-span-2">
        {
          products.slice(4, 5).map((product) => (
            <Product key={product.id} product={product} />
          )) //dyz
        }
      </div>

      {
        products.slice(5).map((product) => (
          <Product key={product.id} product={product} />
        )) //dyz
      }
    </div>
  );
}

export default ProductFeed;
