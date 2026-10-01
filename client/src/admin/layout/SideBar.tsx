import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
      <NavLink to="/admin">Dashboard</NavLink>

      <NavLink to="/admin/products">Products</NavLink>

      <NavLink to="/admin/orders">Orders</NavLink>

      <NavLink to="/admin/users">Users</NavLink>
    </>
  );
}
