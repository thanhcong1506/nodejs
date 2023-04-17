import { configureStore } from "@reduxjs/toolkit";
import cartItemsSlice from "./cartSlice";

const store = configureStore({
  reducer: {
    cart: cartItemsSlice,
  },
});
export default store;
