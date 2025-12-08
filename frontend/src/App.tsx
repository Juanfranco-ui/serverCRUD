import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import FieldsPage from "./pages/FieldsPage";
import ComplexPage from "./pages/ComplexPage";
import ServicesPage from "./pages/ServicesPage";

// Simple Dashboard Home Component
function DashboardHome() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Bienvenido al panel de administración.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Reservas Hoy</h3>
            <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-lg">📅</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
            <span>↑ 15%</span>
            <span className="text-gray-400 dark:text-gray-500">vs ayer</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Ingresos Mes</h3>
            <span className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-2 rounded-lg">💰</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">$1.2M</p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-2 flex items-center gap-1">
            <span>↑ 8%</span>
            <span className="text-gray-400 dark:text-gray-500">vs mes anterior</span>
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Canchas Activas</h3>
            <span className="bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-2 rounded-lg">⚽</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">4</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">De 5 totales</p>
        </div>
      </div>

      {/* Recent Activity / Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Actividad Reciente</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors border-b last:border-0 border-gray-50 dark:border-gray-700">
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                👤
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Nueva reserva de Juan Pérez</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Hace {i * 15} minutos • Cancha 1</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="canchas" element={<FieldsPage />} />
          <Route path="complejo" element={<ComplexPage />} />
          <Route path="servicios" element={<ServicesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;