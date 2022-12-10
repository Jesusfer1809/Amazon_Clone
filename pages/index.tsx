import Head from 'next/head'

import axios from 'axios'
import { AxiosData, Product } from 'types'
import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Banner from 'components/Banner'
import Header from 'components/Header'
import ProductFeed from 'components/ProductFeed'

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([])

  const fetchProducts = async (): Promise<void> => {
    try {
      const { data }: { data: AxiosData['data'] } = await axios.get(
        'https://fakestoreapi.com/products'
      )

      console.log(data)
      setProducts(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    void fetchProducts()
  }, [])

  return (
    <div>
      <Head>
        <title>Amazon Clone</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main className='bg-gray-100'>
        <Banner />

        <ProductFeed products={products} />
      </main>
    </div>
  )
}

export default Home
