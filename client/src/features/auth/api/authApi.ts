export interface LoginCredentials {
  email: string;
  password: string;
}
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  age: number;
  accessToken: string;
}

export const LoginApi = async (
  credentials: LoginCredentials,
): Promise<User> => {
  const response = await fetch("http://localhost:8000/api/auth/login", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(credentials),
  });
  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};

export const authCheckApi = async () => {
  const authCheck = await fetch("http://localhost:8000/api/auth/me", {
    credentials: "include",
  });

  return authCheck.json();
};
