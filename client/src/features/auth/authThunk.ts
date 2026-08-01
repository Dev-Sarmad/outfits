import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  authCheckApi,
  LoginApi,
  signUpApi,
  User,
  SignUpPayload,
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
  void,
  SignUpPayload,
  { rejectValue: any }
>("auth/signup", async (credentials, thunkApi) => {
  try {
    return await signUpApi(credentials);
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
