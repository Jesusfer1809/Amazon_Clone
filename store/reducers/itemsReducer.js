import * as types from "../types";

const initialState = {
  items: [],
};

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return { items: [...state.items, action.payload] };
      break;

    case "RISE_QTY":
      return {
        items: state.items.map((el) => {
          if (el.id === action.payload.id) {
            return { ...el, qty: el.qty + 1 };
          } else {
            return el;
          }
        }),
      };
      break;

    case "REDUCE_QTY":
      return {
        items: state.items.map((el) => {
          if (el.id === action.payload.id) {
            if (el.qty > 1) return { ...el, qty: el.qty - 1 };
          } else {
            return el;
          }
        }),
      };
      break;
    default:
      return state;
  }
};
