import axios from "axios";

import { loginFormData } from "../validation/authValidationSchema";

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
  const data = response.data;

  return data;
};

export const authCheckApi = async () => {
  const authCheck = await axios.get("http://localhost:8000/api/auth/me", {
    withCredentials: true,
  });

  return authCheck.data;
};
