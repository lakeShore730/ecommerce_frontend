import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchKey: "",
  category: null,
};

export const productSearchSlice = createSlice({
  name: "productSearch",
  initialState,
  reducers: {
    setSearchProductData: (state, action) => {
      if (action.payload.hasOwnProperty("searchKey")) {
        state.searchKey = action.payload.searchKey;
      }
      if (action.payload.hasOwnProperty("category")) {
        state.category = action.payload.category;
      }
    },
  },
});

export const { setSearchProductData } = productSearchSlice.actions;
export default productSearchSlice.reducer;
