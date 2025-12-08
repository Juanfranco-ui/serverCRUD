import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../context/SidebarContext";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}