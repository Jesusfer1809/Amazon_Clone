import React, { useContext, useState } from 'react'
import Image from 'next/image'

import { Product as ProductI } from 'types'
import BasketContext from 'context/Tasks/BasketContext'
import StarsRow from './StarsRow'

interface ProductProps {
  product: ProductI
}

function Product({ product }: ProductProps): JSX.Element {
  const { products, addProductToBasket } = useContext(BasketContext)
  const { title, description, price, category, image } = product

  const productHasPrime = product.rating.rate > 4

  const [isOnBasket, setIsOnBasket] = useState(
    products.find((el) => product.id === el.id) !== undefined
  )

  const addItemToBasket = (): void => {
    addProductToBasket({ ...product, quantity: 1, hasPrime: productHasPrime })
    setIsOnBasket(true)
  }

  return (
    <div className='bg-white p-8 rounded-sm relative shadow-sm shadow-gray-300'>
      <div className='text-sm 2xl:text-base absolute top-2 right-2 italic text-gray-400'>
        {category}
      </div>

      <div>
        <Image alt={product.title} src={image} width={150} height={180} />
      </div>

      <div className='mt-8 font-medium line-clamp-2 2xl:text-lg'>
        <p>{title}</p>
      </div>

      <StarsRow product={product} />

      <div className='font-semibold'>
        <span className='text-xs 2xl:text-base'>US$</span>{' '}
        <span className='text-lg 2xl:text-xl'>{price.toFixed(2)}</span>
      </div>

      {productHasPrime ? (
        <div className='text-sm 2xl:text-base flex flex-row space-x-2 items-center'>
          <div className='w-12 2xl:w-14'>
            <Image
              alt='prime'
              src='https://links.papareact.com/fdw'
              width={300}
              height={300}
              layout='responsive'
            />
          </div>
          <p>FREE Next-day Delivery</p>
        </div>
      ) : (
        <div className='w-full h-12'>&nbsp;</div>
      )}

      <div className=' mt-8 text-xs line-clamp-2 2xl:text-base'>
        {description}
      </div>

      {!isOnBasket ? (
        <button
          className='mt-12 w-full py-2 font-semibold bg-gradient-to-b from-yellow-200 to-yellow-400 2xl:text-lg'
          onClick={addItemToBasket}
        >
          Add to Basket
        </button>
      ) : (
        <button className='mt-12 w-full py-2 font-semibold bg-gray-500 2xl:text-lg'>
          Added to Basket
        </button>
      )}
    </div>
  )
}

export default Product
