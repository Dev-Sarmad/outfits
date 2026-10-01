import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import {
  selectAuthInitialized,
  selectUser,
} from "@/features/auth/authSelector";

function AdminRoute() {
  const user = useSelector(selectUser);
  const authInitialized = useSelector(selectAuthInitialized);

  if (!authInitialized) return null;
  if (!user) return <Navigate replace to={"/login"} />;
  if (user.role !== "admin") return <Navigate replace to={"/"} />;

  return <Outlet />;
}

export default AdminRoute;
