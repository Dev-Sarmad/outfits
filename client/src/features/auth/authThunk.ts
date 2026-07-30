import { createAsyncThunk } from "@reduxjs/toolkit";

import { authCheckApi, LoginApi, LoginCredentials, User } from "./api/authApi";
export const loginUser = createAsyncThunk<
  User,
  LoginCredentials,
  { rejectValue: any }
>("auth/login", async (credentials, thunkApi) => {
  try {
    return await LoginApi(credentials);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const authCheckUser = createAsyncThunk(
  "auth/check",
  async (_, thunkApi) => {
    try {
      return await authCheckApi();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
