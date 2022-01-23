import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
      console.log(state.items);
    },

    riseItemQty: (state, action) => {
      state.items.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, qty: item.qty + 1 };
        } else {
          return item;
        }
      });
    },

    reduceItemQty: (state, action) => {},

    removeFromBasket: (state, action) => {},
  },
});

export const { addToBasket, removeFromBasket, riseItemQty, reduceItemQty } =
  basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice

export default basketSlice.reducer;
