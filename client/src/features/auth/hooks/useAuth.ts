import { useDispatch, useSelector } from "react-redux";

import {
  selectUser,
  selectIsAuthenticated,
  selectStatus,
} from "../authSelector";
import { AppDispatch } from "../../../../store/store";
import { logoutUser } from "../authThunk";

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const status = useSelector(selectStatus);

  async function Logout() {
    await dispatch(logoutUser());
  }

  return { user, isAuthenticated, status, Logout };
}
