import { createSlice } from "@reduxjs/toolkit";

import { authCheckUser, loginUser, logoutUser, signUpUser } from "./authThunk";
import { User } from "./api/authApi";

interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "success" | "failed";
  isAuthenticated: boolean;
  error: any | null;
}
const initialState: AuthState = {
  user: null,
  status: "idle",
  isAuthenticated: false,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup() {},
    login() {},
    logout(state) {
      (state.user = null),
        (state.isAuthenticated = false),
        (state.status = "idle");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthenticated = false;
        state.status = "loading";
        state.error = null;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.status = "success";
        state.error = null;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.status = "failed";
        state.error = action.payload;
        state.user = null;
      })
      .addCase(authCheckUser.pending, (state) => {
        state.isAuthenticated = false;
        state.error = null;
        (state.status = "loading"), (state.user = null);
      })
      .addCase(authCheckUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.error = null;
        (state.status = "success"), (state.user = action.payload);
      })
      .addCase(authCheckUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.error = action.payload;
        (state.status = "failed"), (state.user = null);
      })

      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.user = null
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "success";
        state.error =null;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "idle";
      });
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
