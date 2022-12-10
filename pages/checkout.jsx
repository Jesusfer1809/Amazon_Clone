import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import { useSession, signIn, signOut } from 'next-auth/react'

import Image from 'next/image'
import CartProduct from '../components/CartProduct'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

const stripePromise = loadStripe(process.env.stripe_public_key)

function Checkout() {
  const { data: session } = useSession()
  const items = useSelector((state) => state.items.items)
  const price = useSelector((state) =>
    state.items.items
      .map((item) => item.price * item.qty)
      .reduce((counter, price) => counter + price, 0)
  )

  const createCheckoutSession = async () => {
    const stripe = await stripePromise

    // call the backend to create the checkout session...

    const checkoutSession = await axios.post('/api/create-checkout-session', {
      items,
      email: session.user.email
    })

    // redirect user to checkout

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id
    })

    if (result.error) alert(result.error.message)
  }

  const basketButton = () => {
    if (session) {
      if (items.length > 0) {
        return (
          <button
            role='link'
            className=' block mt-12 px-4 justify-self-end py-2 font-semibold bg-gradient-to-b from-yellow-200 to-yellow-400'
            onClick={createCheckoutSession}
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
            src='https://links.papareact.com/ikj'
            width={1020}
            height={250}
            objectFit='contain'
          />

          <div className='px-0 py-8 flex flex-col space-y-8 bg-gray-100'>
            <div>
              {items.length === 0 ? (
                <span className='text-2xl font-semibold'>
                  Your Shopping Basket is Empty
                </span>
              ) : (
                <span className='text-2xl font-semibold'>Shopping Basket</span>
              )}
            </div>

            {items.map((product) => (
              <CartProduct product={product} />
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
