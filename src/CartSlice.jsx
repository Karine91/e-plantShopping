import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existedItem = state.items.find((item) => item.name === name);
      if (existedItem) {
        existedItem.qty++;
      } else {
        state.items.push({ name, image, cost, qty: 1 });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { name, qty } = action.payload;
      const item = state.items.find((item) => item.name === name);
      if (item) {
        item.qty = qty;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
