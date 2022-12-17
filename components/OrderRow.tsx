import React from 'react'
import { OrderFrontend } from 'types'
import Image from 'next/image'

interface OrderRowProps {
  order: OrderFrontend
}

function OrderRow({ order }: OrderRowProps): JSX.Element {
  const quantity = order.items.reduce((acc, item) => {
    if (item.quantity !== null) {
      return acc + item.quantity
    } else {
      return acc + 1
    }
  }, 0)
  return (
    <div className='w-full  border-2 border-gray-300 text-gray-800'>
      <div className='p-2 text-sm  flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:justify-between bg-gray-100 font-medium'>
        <div className='flex space-x-4 items-center'>
          <div className=''>TOTAL</div>
          <div className='flex items-center space-x-1'>
            <span className=' text-lg'>${order.amount}</span>
            <span>- Next day delivery $6.99</span>
          </div>
        </div>

        <div>
          <div>
            <span className='font-medium'>Order # </span>
            {order.order_id.slice(0, 20)}...
          </div>
          <div className='text-lg'>{quantity} items</div>
        </div>
      </div>
      <div className='bg-white flex gap-4 justify-between p-4 flex-wrap'>
        {order.images.map((imageURL) => (
          <div key={imageURL} className='w-20 sm:w-24 '>
            <Image
              alt={imageURL}
              src={imageURL}
              width={500}
              height={500}
              layout='responsive'
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderRow
