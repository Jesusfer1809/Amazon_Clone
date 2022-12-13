import React from 'react'
import Header from '../components/Header'

import { AiFillCheckCircle } from 'react-icons/ai'
import Link from 'next/link'

function success(): JSX.Element {
  return (
    <div className='h-screen bg-gray-100'>
      <Header />

      <main className='p-0 lg:p-4'>
        <div className='bg-white p-4 md:p-8'>
          <div className='flex items-center space-x-4'>
            <AiFillCheckCircle className='h-10 w-10 text-green-600' />
            <span className='text-xl sz400:text-2xl font-semibold'>
              Thank you, your order has been confirmed!
            </span>
          </div>

          <div className='mt-8'>
            <p className='font-medium text-sm sz400:text-base'>
              Thank you for shopping with us. We&apos;ll send a confirmation
              once your item has shipped. If you like to check the status of
              your order(s), please press the link below
            </p>
          </div>

          <Link href='/'>
            <button className='block w-full mt-12 px-4 justify-self-end py-2 font-semibold bg-gradient-to-b from-yellow-200 to-yellow-400'>
              Go to the home page
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default success
