import React, { useContext, useState } from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/outline'

import { Product as ProductType } from 'types'
import BasketContext from 'context/Tasks/BasketContext'

interface ProductProps {
  product: ProductType
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

  const createStars = (): JSX.Element | JSX.Element[] => {
    const fullStars = []
    const emptyStars = []
    const flatRating = Math.floor(product.rating.rate)

    for (let i = 1; i <= flatRating; i++) {
      fullStars.push(1)
    }
    for (let i = 5; i > flatRating; i--) {
      emptyStars.push(1)
    }

    return (
      <div className='mt-3 flex'>
        {fullStars.map((_, i) => (
          <StarIcon key={i} className='h-5 w-5 text-amber-500' />
        ))}
        {emptyStars.map((_, i) => (
          <StarIconOutline key={i} className='h-5 w-5 text-amber-500' />
        ))}
      </div>
    )
  }

  return (
    <div className='bg-white p-8 rounded-sm relative shadow-sm shadow-gray-300'>
      <div className='text-sm absolute top-2 right-2 italic text-gray-400'>
        {category}
      </div>

      <div>
        <Image alt={product.title} src={image} width={150} height={180} />
      </div>

      <div className='mt-8 font-medium line-clamp-2'>
        <p>{title}</p>
      </div>

      {createStars()}

      <div className='font-semibold'>
        <span className='text-xs'>US$</span>{' '}
        <span className='text-lg'>{price.toFixed(2)}</span>
      </div>

      {productHasPrime ? (
        <div className='text-sm flex flex-row space-x-2 items-center'>
          <div className='w-12'>
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

      <div className=' mt-8 text-xs line-clamp-2'>{description}</div>

      {!isOnBasket ? (
        <button
          className='mt-12 w-full py-2 font-semibold bg-gradient-to-b from-yellow-200 to-yellow-400'
          onClick={addItemToBasket}
        >
          Add to Basket
        </button>
      ) : (
        <button className='mt-12 w-full py-2 font-semibold bg-gray-500 '>
          Added to Basket
        </button>
      )}
    </div>
  )
}

export default Product
