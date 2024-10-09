import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // Initialize items as an empty array
    totalQty: 0,
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
      state.totalQty++;
    },
    removeItem: (state, action) => {
      const { name, qty } = action.payload;
      state.totalQty -= qty;
      state.items = state.items.filter((item) => item.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, qty } = action.payload;
      const item = state.items.find((item) => item.name === name);
      if (item) {
        state.totalQty -= item.qty;
        item.qty = qty;
        state.totalQty += qty;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
