import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <nav className="w-64 bg-white border-r">
      <div className="p-4 font-bold text-xl">
        Admin Panel
      </div>
      <ul className="space-y-2 p-2">
        <li>
          <NavLink
            to="/canchas"
            className={({ isActive }) =>
              (isActive ? "font-semibold text-blue-600" : "text-gray-700") +
              " block px-3 py-2 rounded hover:bg-gray-200"
            }
          >
            Canchas
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/complejo"
            className={({ isActive }) =>
              (isActive ? "font-semibold text-blue-600" : "text-gray-700") +
              " block px-3 py-2 rounded hover:bg-gray-200"
            }
          >
            Complejo
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/servicios"
            className={({ isActive }) =>
              (isActive ? "font-semibold text-blue-600" : "text-gray-700") +
              " block px-3 py-2 rounded hover:bg-gray-200"
            }
          >
            Servicios
          </NavLink>
        </li>
        {/* agregá más items según lo que necesites */}
      </ul>
    </nav>
  );
}