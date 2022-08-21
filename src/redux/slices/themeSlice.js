import { createSlice } from "@reduxjs/toolkit";
import { getTheme, setTheme } from "../../utils/utils";

const initialState = {
  value: getTheme(),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const value = state.value === "light" ? "dark" : "light";
      state.value = value;
      setTheme(value);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
