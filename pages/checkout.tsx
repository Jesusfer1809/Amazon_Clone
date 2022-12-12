import React, { useContext, useEffect, useState } from 'react'

import Header from '../components/Header'
import { useSession } from 'next-auth/react'
import { NextPage } from 'next'

import Image from 'next/image'
import CartProduct from '../components/CartProduct'

import BasketContext from 'context/Tasks/BasketContext'
import { checkout } from 'utils/checkout'

const Checkout: NextPage = () => {
  const { data: session } = useSession()
  const { products } = useContext(BasketContext)

  const [price, setPrice] = useState(0)

  useEffect(() => {
    const NewPrice = products
      .map((product) => product.price * product.quantity)
      .reduce((counter, price) => counter + price, 0)
    setPrice(NewPrice)
  }, [products])

  // const createCheckoutSession = async (): Promise<void> => {
  //   try {
  //     const stripe = await stripePromise

  //     // call the backend to create the checkout session...

  //     if (session === null) return
  //     const checkoutSession = await axios.post('/api/create-checkout-session', {
  //       products,
  //       email: session.user?.email
  //     })

  //     // redirect user to checkout

  //     const result = await stripe.redirectToCheckout({
  //       sessionId: checkoutSession.data.id
  //     })
  //   } catch (err) {
  //     alert(err.message)
  //   }
  // }

  const basketButton = (): JSX.Element | JSX.Element[] => {
    if (session !== null) {
      if (products.length > 0) {
        return (
          <button
            role='link'
            className=' block mt-12 px-4 justify-self-end py-2 font-semibold bg-gradient-to-b from-yellow-200 to-yellow-400'
            onClick={() => {
              console.log('CHECKOUT')
              void checkout({
                user: session.user,
                lineItems: products
              })
            }}
          >
            Proceed to checkout
          </button>
        )
      }

      return (
        <button className=' block mt-12 px-4 justify-self-end py-2 font-semibold bg-gray-300'>
          Add items to your basket
        </button>
      )
    }

    return (
      <button className=' block mt-12 px-4 justify-self-end py-2 font-semibold bg-gray-300'>
        Sign In to checkout
      </button>
    )
  }

  return (
    <div className='bg-gray-100'>
      <Header />

      <main className=' p-5 grid grid-cols-1 lg:grid-cols-[4fr_1fr] xl:grid-cols-[5fr_1fr] gap-5 '>
        <div className='bg-white'>
          <Image
            alt='banner'
            src='https://links.papareact.com/ikj'
            width={1020}
            height={250}
            objectFit='contain'
          />

          <div className='px-0 py-8 flex flex-col space-y-8 bg-gray-100'>
            <div>
              {products.length === 0 ? (
                <span className='text-2xl font-semibold'>
                  Your Shopping Basket is Empty
                </span>
              ) : (
                <span className='text-2xl font-semibold'>Shopping Basket</span>
              )}
            </div>

            {products.map((product) => (
              <CartProduct key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className=' bg-white p-2 '>
          <span className='font-semibold text-2xl'>Subtotal:</span>

          <div className='font-semibold mt-4 text-xl '>
            US$ {price.toFixed(2)}
          </div>

          {basketButton()}
        </div>
      </main>
    </div>
  )
}

export default Checkout
