import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  authCheckApi,
  LoginApi,
  signUpApi,
  User,
  SignUpPayload,
  logoutApi,
} from "./api/authApi";
import { loginFormData } from "./validation/authValidationSchema";
export const loginUser = createAsyncThunk<
  User,
  loginFormData,
  { rejectValue: any }
>("auth/login", async (credentials, thunkApi) => {
  try {
    return await LoginApi(credentials);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const signUpUser = createAsyncThunk<
  User,
  SignUpPayload,
  { rejectValue: any }
>("auth/signup", async (credentials, thunkApi) => {
  try {
    const data = await signUpApi(credentials);

    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.response?.data || error.message);
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

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      await logoutApi();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
