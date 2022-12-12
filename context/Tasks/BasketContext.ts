import { createContext } from 'react'
import { BasketContextInterface } from 'types'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const BasketContext = createContext<BasketContextInterface>(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as BasketContextInterface
)

export default BasketContext
