import React, { useEffect, useReducer } from 'react'

import TasksContext from './BasketContext'

import { BasketStateI, BasketProduct } from 'types'
import BasketReducer from './BasketReducer'

interface BasketStateProps {
  children: React.ReactNode
}

const initialState: BasketStateI = {
  products: []
}

const BasketState = (props: BasketStateProps): JSX.Element => {
  const [state, dispatch] = useReducer(BasketReducer, initialState)

  useEffect(() => {
    let tasksLC
    const stringLC = localStorage.getItem('products')

    if (stringLC !== null) {
      tasksLC = JSON.parse(stringLC) as BasketStateI['products']
      dispatch({ type: 'ADD_PRODUCT', payload: tasksLC })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(state.products))
  }, [state.products])

  const addProductToBasket = (product: BasketProduct): void => {
    dispatch({
      type: 'ADD_PRODUCT',
      payload: [product]
    })
  }

  // const getTask = (id: ID): TaskStructure | undefined => {
  //   const task = state.tasks.find((task: TaskStructure) => {
  //     return task.id === id
  //   })
  //   if (task !== undefined) {
  //     return task
  //   } else {
  //     return undefined
  //   }
  // }

  const riseItemQty = (product: BasketProduct): void => {
    dispatch({
      type: 'RISE_QTY',
      payload: product
    })
  }

  const reduceItemQty = (product: BasketProduct): void => {
    dispatch({
      type: 'REDUCE_QTY',
      payload: product
    })
  }

  const removeProductFromBasket = (product: BasketProduct): void => {
    dispatch({
      type: 'REMOVE_PRODUCT',
      payload: product
    })
  }

  return (
    <TasksContext.Provider
      value={{
        products: state.products,
        addProductToBasket,
        riseItemQty,
        reduceItemQty,
        removeProductFromBasket
      }}
    >
      {props.children}
    </TasksContext.Provider>
  )
}

export default BasketState
