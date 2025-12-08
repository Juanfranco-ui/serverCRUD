import { NavLink } from "react-router-dom";
import { LayoutDashboard, LandPlot, Building2, Settings, Menu, X, ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useSidebar } from "../context/SidebarContext";

export default function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isCollapsed, toggleSidebar } = useSidebar();

  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/canchas", icon: LandPlot, label: "Canchas" },
    { to: "/complejo", icon: Building2, label: "Complejo" },
    { to: "/servicios", icon: Settings, label: "Servicios" },
  ];

  // Mock user data - this will be replaced with real auth data later
  const user = {
    name: "Juan",
    role: "Administrador",
    avatar: "J",
    initials: "J"
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        onClick={toggleMobileSidebar}
      >
        {isMobileOpen ? <X size={24} className="dark:text-white" /> : <Menu size={24} className="dark:text-white" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`
          fixed md:static inset-y-0 left-0 z-40
          ${isCollapsed ? "w-16" : "w-64"}
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
          transform transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
              {user.initials}
            </div>
            <span
              className={`font-bold text-lg text-gray-800 dark:text-white whitespace-nowrap transition-all duration-300 ${isCollapsed ? "opacity-0 w-0" : "opacity-100"
                }`}
            >
              Admin Panel
            </span>
          </div>

          {/* Desktop Toggle Button */}
          <button
            onClick={toggleSidebar}
            className={`hidden md:flex items-center justify-center w-6 h-6 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex-shrink-0 ${isCollapsed ? "ml-0" : ""
              }`}
            title={isCollapsed ? "Expandir" : "Colapsar"}
          >
            {isCollapsed ? (
              <ChevronRight size={18} className="text-gray-600 dark:text-gray-300" />
            ) : (
              <ChevronLeft size={18} className="text-gray-600 dark:text-gray-300" />
            )}
          </button>

          {/* Theme Toggle - only show when expanded */}
          {!isCollapsed && (
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <ul className="flex-1 space-y-1 p-3 overflow-y-auto">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center ${isCollapsed ? "justify-center px-3" : "gap-3 px-4"} py-3 rounded-xl transition-all duration-200 group relative ${isActive
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
                  }`
                }
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon size={20} className="flex-shrink-0" />
                <span
                  className={`transition-all duration-300 whitespace-nowrap ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                    }`}
                >
                  {item.label}
                </span>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* User Profile Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-3 flex-shrink-0">
          {/* User Info */}
          <div
            className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer mb-2`}
            title={isCollapsed ? user.name : undefined}
          >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
              {user.avatar}
            </div>
            <div
              className={`transition-all duration-300 overflow-hidden ${isCollapsed ? "opacity-0 w-0" : "opacity-100"
                }`}
            >
              <p className="font-medium text-sm text-gray-800 dark:text-white whitespace-nowrap">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {user.role}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            className={`w-full flex items-center ${isCollapsed ? "justify-center px-2" : "gap-3 px-4"} py-2.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group relative`}
            title={isCollapsed ? "Cerrar Sesión" : undefined}
          >
            <LogOut size={18} className="flex-shrink-0" />
            <span
              className={`text-sm font-medium transition-all duration-300 whitespace-nowrap ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                }`}
            >
              Cerrar Sesión
            </span>

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                Cerrar Sesión
              </span>
            )}
          </button>
        </div>
      </nav>
    </>
  );
}