import React from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]'
import { dbConnect } from 'utils/mongoose'
import Order from 'models/OrderModel'
import { OrderDB, OrderFrontend } from 'types'
import Head from 'next/head'

import Stripe from 'stripe'
import Header from 'components/Header'
import { useSession } from 'next-auth/react'
import OrderRow from 'components/OrderRow'

interface OrdersProps {
  orders?: OrderFrontend[]
}

const Orders: NextPage<OrdersProps> = ({ orders }) => {
  console.log(orders)
  const { data: session } = useSession()
  return (
    <div>
      <Head>
        <title>Amazon Clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main className='bg-gray-100 min-h-screen flex justify-center'>
        <div className='w-full px-2 sm:px-6 md:px-10 lg:px-0 lg:w-3/5 py-16'>
          <h1 className='text-2xl md:text-3xl font-medium w-full pb-1 border-b-2 border-yellow-500'>
            Your orders
          </h1>
          {session === null && (
            <div className='font-medium text-sm mt-4 md:text-base'>
              {' '}
              Please Log in to see your orders
            </div>
          )}
          {session !== null &&
            (orders === undefined || orders.length === 0) && (
              <div className='font-medium text-sm mt-4 md:text-base'>
                Your orders will appear here. Go do some shopping!
              </div>
            )}

          {session !== null && orders !== undefined && orders?.length > 0 && (
            <div className='mt-4'>
              <div className='font-medium text-sm '>
                {orders?.length} orders
              </div>

              <div className='mt-8 flex flex-col space-y-8'>
                {orders.map((order) => (
                  <OrderRow key={order.order_id} order={order} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Orders

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15'
  })

  const { req, res } = ctx

  const session = await unstable_getServerSession(req, res, authOptions)

  if (session === null) {
    return {
      props: {}
    }
  }

  await dbConnect()
  const stripeOrders: OrderDB[] = await Order.find({
    customer: session.user?.email
  })
  console.log(JSON.stringify(stripeOrders))

  const orders = await Promise.all(
    stripeOrders.map(async (order) => {
      return {
        order_id: order.session_id,
        amount: order.amount,
        images: order.images,
        timestamp: String(order.createdAt),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        items: (
          await stripe.checkout.sessions.listLineItems(order.session_id, {
            limit: 100
          })
        ).data
      }
    })
  )

  return {
    props: {
      orders
    }
  }
}
