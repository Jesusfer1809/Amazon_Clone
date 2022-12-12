import React from 'react'
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn
} from 'next-auth/react'
import Image from 'next/image'
import { GetServerSideProps, NextPage } from 'next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth/next'
import { BuiltInProviderType } from 'next-auth/providers'

interface LoginProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null
}

const Login: NextPage<LoginProps> = ({ providers }) => {
  return (
    <div className='bg-white min-h-screen flex flex-col  items-center  pb-8'>
      <div className='border-b-[1px] border-yellow-300 shadow-sm py-12 shadow-yellow-100 flex flex-col items-center'>
        <div className='relative flex items-center  h-[30px] w-[130px] cursor-pointer'>
          <Image
            alt='amazon/logo'
            src='/amazon.webp'
            layout='fill'
            objectFit='contain'
          />
        </div>

        <div className='my-8 mx-2'>
          <h1 className='text-3xl font-medium'>Sign in</h1>

          <form
            action='#'
            onSubmit={(e) => e.preventDefault()}
            className='flex flex-col mt-8'
          >
            <label htmlFor='email' className='text-sm'>
              Email address or phone number
            </label>
            <input
              type='text'
              id='email'
              className='border-[1px] border-gray-300 mt-4 px-4 py-2 rounded-md'
            />

            <button className='px-4 py-2 bg-yellow-500 rounded-md mt-6 font-medium'>
              Continue
            </button>
          </form>

          <p className='text-xs block mt-4'>
            On continuing, you accept Amanzon{' '}
            <span className='text-blue-600 border-b-[1px] border-transparent hover:border-blue-600 font-medium'>
              use terms
            </span>{' '}
            and{' '}
            <span className='text-blue-600 border-b-[1px] border-transparent hover:border-blue-600 font-medium'>
              pivacity advice
            </span>
          </p>
        </div>

        {providers != null &&
          Object.values(providers).map((provider) => (
            <div className='mt-2' key={provider.name}>
              <button
                className='text-white inline-block bg-black px-7 py-3 rounded-3xl'
                onClick={async () =>
                  await signIn(provider.id, { callbackUrl: '/' })
                }
              >
                Connect with {provider.name}
              </button>
            </div>
          ))}

        <div className='mt-8  w-full flex flex-col items-center'>
          <span className='block text-gray-600 text-xs'>
            Are you new on Amazon?
          </span>
          <button className='w-3/4 mt-2 text-sm bg-gray-400 rounded-md px-3 py-2'>
            Create your account
          </button>
        </div>
      </div>

      <div className='mt-4 text-xs text-gray-600'>
        &copy; 1996-2022 Amazon.com, Inc. or affiliates.
      </div>
    </div>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx

  const session = await unstable_getServerSession(req, res, authOptions)
  if (session != null) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const providers = await getProviders()

  return {
    props: { providers }
  }
  // const providers = await getProviders()

  // return {
  //   props: {
  //     providers
  //   }
  // }
}
