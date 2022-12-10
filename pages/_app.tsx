import React from 'react'
import { Provider } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import store from '../store/store'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'

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
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component key={router.asPath} {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

const makestore = () => store
const wrapper = createWrapper(makestore)

export default wrapper.withRedux(MyApp)
