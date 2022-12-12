import { loadStripe, Stripe } from '@stripe/stripe-js'
import axios from 'axios'
import { Session } from 'next-auth'
import { AxiosStripeData, BasketProduct } from 'types'
import { getErrorMessage } from './functions'

interface CheckoutProps {
  lineItems: BasketProduct[]
  user: Session['user']
}

export const checkout = async ({
  lineItems,
  user
}: CheckoutProps): Promise<void> => {
  let stripePromise = null as Promise<Stripe | null> | null

  try {
    const getStripe = async (): Promise<Stripe | null> => {
      if (stripePromise === null) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY as string)
      }
      return await stripePromise
    }

    const stripe = await getStripe()

    const { data }: { data: AxiosStripeData } = await axios.post(
      '/api/create-checkout-session',
      {
        items: lineItems,
        email: user?.email
      }
    )

    try {
      if (stripe !== null) {
        await stripe.redirectToCheckout({
          sessionId: data.id
        })
      }
    } catch (err) {
      const message = getErrorMessage(err)
      alert(message)
    }
  } catch (err) {
    console.log('ERROR', err)
  }
}
