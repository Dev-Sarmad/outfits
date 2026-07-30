import { useDispatch, useSelector } from "react-redux";

import {
  selectUser,
  selectIsAuthenticated,
  selectStatus,
} from "../authSelector";
import { AppDispatch } from "../../../../store/store";
import { logout } from "../authSlice";

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const status = useSelector(selectStatus);

  function Logout() {
    dispatch(logout());
  }

  return { user, isAuthenticated, status, Logout };
}
