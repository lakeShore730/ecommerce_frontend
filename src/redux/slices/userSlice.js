import { createSlice } from "@reduxjs/toolkit";
import {
  getUserData,
  setUserLogin,
  restLoginData,
  isUserLogin,
  setUserData,
} from "../../utils/utils";

const initialState = {
  user: getUserData() || {},
  loginStatus: isUserLogin() || false,
};

export const accountSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      setUserLogin({ ...action.payload });
      state.user = action.payload.userData;
      state.loginStatus = true;
    },

    setUser: (state, action) => {
      if (!action.payload) return;
      state.user = { ...state.user, ...action.payload };
      setUserData({ ...state.user, ...action.payload });
    },

    resetLogin: (state) => {
      restLoginData();
      state.user = {};
      state.loginStatus = false;
    },
  },
});

export const { setLogin, setUser, resetLogin } = accountSlice.actions;
export default accountSlice.reducer;
