import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import productReducer from "./productsSlice.js";
import cartReducer from "./cartSlice.js";

const store = configureStore({
  reducer: {
    users: userReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;
