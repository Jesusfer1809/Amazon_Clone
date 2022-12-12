// import { v4 as uuidv4 } from 'uuid'
// import { trimDate } from '../../utils/functions'

import { BasketProduct, BasketStateI } from 'types'

type BasketAction =
  | {
      type: 'ADD_PRODUCT'
      payload: BasketProduct[]
    }
  | {
      type: 'RISE_QTY'
      payload: BasketProduct
    }
  | {
      type: 'REDUCE_QTY'
      payload: BasketProduct
    }
  | {
      type: 'REMOVE_PRODUCT'
      payload: BasketProduct
    }

const BasketReducer = (
  state: BasketStateI,
  action: BasketAction
): BasketStateI => {
  const { payload, type } = action

  switch (type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, ...payload]
      }

    case 'RISE_QTY':
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === payload.id
            ? { ...payload, quantity: product.quantity + 1 }
            : product
        )
      }

    case 'REDUCE_QTY':
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === payload.id && product.quantity > 0) {
            return { ...payload, quantity: product.quantity - 1 }
          } else {
            return product
          }
        })
      }

    case 'REMOVE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((product) => product.id !== payload.id)
      }

    default:
      return state
  }
}

export default BasketReducer
