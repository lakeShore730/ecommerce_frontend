import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../slices/themeSlice";
import productSearchSlice from "../slices/productSearchSlice";
import userSlice from "../slices/userSlice";
import cartSlice from "../slices/cartSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
    productSearchData: productSearchSlice,
    cart: cartSlice,
  },
});
