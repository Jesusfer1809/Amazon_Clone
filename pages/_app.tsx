import React from 'react'

import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import BasketState from 'context/Tasks/BasketState'

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Session } from 'next-auth'

function MyApp({
  Component,
  pageProps
}: AppProps<{
  session: Session
}>): JSX.Element {
  const router = useRouter()
  return (
    <BasketState>
      <SessionProvider session={pageProps.session}>
        <Component key={router.asPath} {...pageProps} />
      </SessionProvider>
    </BasketState>
  )
}

export default MyApp
