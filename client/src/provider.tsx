import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { AppDispatch } from "../store/store";

import { authCheckUser } from "./features/auth/authThunk";

export function Provider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(authCheckUser());
  }, [dispatch]);

  return <>{children}</>;
}
