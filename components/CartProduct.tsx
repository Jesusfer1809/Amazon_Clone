import React, { useContext } from 'react'
import Image from 'next/image'

import StarsRow from './StarsRow'
import { BasketProduct } from 'types'
import BasketContext from 'context/Tasks/BasketContext'

interface CartProductProps {
  product: BasketProduct
}

function CartProduct({ product }: CartProductProps): JSX.Element {
  const { riseItemQty, reduceItemQty, removeProductFromBasket } =
    useContext(BasketContext)

  const { title, description, price, category, image } = product

  const riseQty = (): void => {
    riseItemQty(product)
  }

  const reduceQty = (): void => {
    reduceItemQty(product)
  }

  const removeItemFromBasket = (): void => {
    removeProductFromBasket(product)
  }

  return (
    <div className='bg-white p-4 rounded-sm relative grid grid-cols-5 gap-x-4 gap-y-8 items-center justify-items-center '>
      <div className='text-sm absolute top-2 right-2 italic text-gray-400'>
        {category}
      </div>

      <div className=' col-span-2 md:col-span-1'>
        <Image alt={title} src={image} width={150} height={180} />
      </div>

      <div className='col-span-3'>
        <div className='mt-4 font-medium line-clamp-2'>
          <p>{title}</p>
        </div>

        <StarsRow product={product} />

        <div className='font-semibold'>
          <span className='text-xs'>US$</span>{' '}
          <span className='text-lg'>{price.toFixed(2)}</span>
        </div>

        {product.hasPrime === true && (
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
        )}

        <div className=' mt-8 text-xs line-clamp-2'>{description}</div>
      </div>

      <div className=' flex flex-row md:block items-center space-x-12 md:space-x-0  col-span-5   sm:col-span-3 sm:col-start-3 md:col-span-1'>
        <div className='flex items-center space-x-4 justify-center '>
          <div
            className='h-7 w-7 bg-yellow-400 rounded-full text-lg font-semibold flex justify-center items-center cursor-pointer'
            onClick={riseQty}
          >
            +
          </div>

          <div>{product.quantity}</div>

          <div
            className='h-7 w-7 bg-yellow-400 rounded-full text-lg font-semibold flex justify-center items-center cursor-pointer'
            onClick={reduceQty}
          >
            -
          </div>
        </div>
        <button
          className='md:mt-12 px-4 justify-self-end py-2 font-semibold bg-gradient-to-b from-yellow-200 to-yellow-400'
          onClick={removeItemFromBasket}
        >
          Remove from Basket
        </button>
      </div>
    </div>
  )
}

export default CartProduct
