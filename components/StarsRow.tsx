import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import React from 'react'
import { BasketProduct, Product } from 'types'

interface StarsRowProps {
  product: Product | BasketProduct
}

function StarsRow({ product }: StarsRowProps): JSX.Element {
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
        <AiFillStar key={i} className='h-5 w-5 text-amber-500' />
      ))}
      {emptyStars.map((_, i) => (
        <AiOutlineStar key={i} className='h-5 w-5 text-amber-500' />
      ))}
    </div>
  )
}

export default StarsRow
