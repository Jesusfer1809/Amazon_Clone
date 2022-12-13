import type { NextApiRequest, NextApiResponse } from 'next'
import { BasketProduct } from 'types'

import Stripe from 'stripe'
import { getErrorMessage } from 'utils/functions'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15'
})

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

interface Data {
  id?: string
  message?: string
}

interface BodyI {
  items: BasketProduct[]
  email: string
}

const checkout = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> => {
  try {
    const { items, email } = req.body as BodyI

    const transformedItems = items.map((item) => ({
      // description: item.description,
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: item.price * 100,
        product_data: {
          description: item.description,
          name: item.title,
          images: [item.image]
        }
      }
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: transformedItems,
      mode: 'payment',
      success_url: `${process.env.HOST as string}/success`,
      cancel_url: `${process.env.HOST as string}/checkout`,

      metadata: {
        email
        // images: JSON.stringify(products.map((item) => item.image))
      }
    })

    res.status(200).json({ id: session.id }) // uwu
  } catch (err) {
    const message = getErrorMessage(err)

    res.status(400).json({
      message
    })
  }
}

export default checkout
