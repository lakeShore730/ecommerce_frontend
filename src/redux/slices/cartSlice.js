import { createSlice } from "@reduxjs/toolkit";
import { getCart, setCart } from "../../utils/utils";

const initialState = {
  cartList: getCart(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductOnCart: (state, action) => {
      if (!action.payload) return;

      const hasProductExisted = state.cartList.find(
        (cart) => cart.product.id === action.payload.product.id
      );

      if (hasProductExisted) {
        const newCartList = state.cartList.map((cart) => {
          if (cart.product.id !== action.payload.product.id) return cart;
          return { ...cart, quantity: cart.quantity + action.payload.quantity };
        });

        state.cartList = newCartList;
        setCart(newCartList);
        return;
      }

      state.cartList.push(action.payload);
      setCart([...state.cartList]);
    },

    removeProductFromCart: (state, action) => {
      if (!action.payload.productId) return;
      const newCartList = state.cartList.filter(
        (cart) => cart.product.id !== action.payload.productId
      );

      state.cartList = newCartList;
      setCart(newCartList);
    },

    updateCartProduct: (state, action) => {
      const newCartList = state.cartList.map((cart) => {
        if (cart.product.id !== action.payload.product.id) return cart;
        return { ...cart, ...action.payload };
      });

      state.cartList = newCartList;
      setCart(newCartList);
    },

    clearAllCart: (state) => {
      state.cartList = [];
      setCart([]);
    },
  },
});

export const {
  addProductOnCart,
  removeProductFromCart,
  updateCartProduct,
  clearAllCart,
} = cartSlice.actions;

export default cartSlice.reducer;
