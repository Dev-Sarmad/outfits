import { Outlet } from "react-router-dom";

import Sidebar from "./SideBar";
import Topbar from "./TopBar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="flex-1">
        <Topbar />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
