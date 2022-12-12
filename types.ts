import { ParsedUrlQuery } from 'querystring'

// export interface RickMortyResults {
//   info: Info
//   results: Character[]
// }

export interface Info {
  count: number
  pages: number
  next: string
  prev: null
}

export interface QueryId extends ParsedUrlQuery {
  id: string
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: Category
  image: string
  rating: Rating
}

export interface BasketProduct extends Product {
  hasPrime?: boolean
  quantity: number
}

export interface BasketStateI {
  products: BasketProduct[]
}

export interface BasketContextInterface {
  products: BasketProduct[]
  addProductToBasket: (product: BasketProduct) => void
  riseItemQty: (product: BasketProduct) => void
  reduceItemQty: (product: BasketProduct) => void
  removeProductFromBasket: (product: BasketProduct) => void
}

export enum Category {
  Electronics = 'electronics',
  Jewelery = 'jewelery',
  MenSClothing = "men's clothing",
  WomenSClothing = "women's clothing"
}

export interface Rating {
  rate: number
  count: number
}

export interface AxiosResult {
  status: string
  data: AxiosData
}

export interface AxiosData {
  data: Product[]
}

// export interface AxiosSingleResult {
//   status: string
//   data: AxiosSingleData
// }

// export interface AxiosSingleData {
//   task: TaskStructure
// }
