import axios from "axios";

import { loginFormData } from "../validation/authValidationSchema";
export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  age: number;
}

export const LoginApi = async (credentials: loginFormData): Promise<User> => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/login",
    credentials,
    { withCredentials: true },
  );

  return response.data.data.safeUser;
};
export const signUpApi = async (credentials: SignUpPayload): Promise<User> => {
  const { data } = await axios.post<User>(
    "http://localhost:8000/api/auth/register",
    credentials,
  );

  return data;
};
export const authCheckApi = async (): Promise<User> => {
  const authCheck = await axios.get("http://localhost:8000/api/auth/me", {
    withCredentials: true,
  });

  return authCheck.data.data;
};
export const logoutApi = async () => {
  await axios.post("http://localhost:8000/api/auth/logout", null, {
    withCredentials: true,
  });
};
