import React from 'react'
import { Product as ProductType } from 'types'

import Image from 'next/image'
import Product from './Product'

interface ProductFeedProps {
  products: ProductType[]
}

function ProductFeed({ products }: ProductFeedProps): JSX.Element {
  return (
    <div className='grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 -mt-24 md:-mt-40 lg:-mt-44 z-30 relative'>
      {
        products.slice(0, 4).map((product) => (
          <Product key={product.id} product={product} />
        )) // dyz
      }

      <div className='col-span-full'>
        <Image
          src='https://links.papareact.com/dyz'
          alt='image'
          width={1000}
          height={200}
          layout='responsive'
        />
      </div>

      <div className='sm:col-span-2'>
        {
          products.slice(4, 5).map((product) => (
            <Product key={product.id} product={product} />
          )) // dyz
        }
      </div>

      {
        products.slice(5).map((product) => (
          <Product key={product.id} product={product} />
        )) // dyz
      }
    </div>
  )
}

export default ProductFeed
