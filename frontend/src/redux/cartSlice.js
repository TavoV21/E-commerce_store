import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
  },
  reducers: {
    fetchCart: (state, action) => {
      state.data = action.payload;
    },
    createCart: (state, action) => {
      state.data.push(action.payload);
    },
    deleteCart: (state, action) => {
      const id = action.payload;
      const cartFound = state.data.filter((cart) => cart.id !== id);
      state.data = cartFound;
    },
  },
});

export const { fetchCart, createCart, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;
